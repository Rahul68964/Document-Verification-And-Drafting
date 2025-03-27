import base64
import os
import requests
from io import BytesIO
from PIL import Image, ImageDraw
import fitz  # PyMuPDF
from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from dotenv import load_dotenv
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = "gemini-2.0-flash"
DOCUMENT_TYPES = ["Land Records", "Caste Certificates", "Property Registrations", "Aadhar Card","Domicile","Leaving Certificate","Pan Card","Election Card","Others"]

def encode_file(uploaded_file):
    try:
        file_bytes = uploaded_file.read()

        if uploaded_file.content_type == "application/pdf":
            pdf = fitz.open(stream=BytesIO(file_bytes))
            page = pdf[0]
            pix = page.get_pixmap()
            img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        elif uploaded_file.content_type.startswith("image/"):
            img = Image.open(BytesIO(file_bytes))
        elif uploaded_file.content_type == "text/plain":
            text = file_bytes.decode("utf-8")
            img = Image.new("RGB", (800, 600), color=(73, 109, 137))
            d = ImageDraw.Draw(img)
            d.text((10, 10), text, fill=(255, 255, 0))
        else:
            return None

        img_byte_arr = BytesIO()
        img.save(img_byte_arr, format="JPEG")
        return base64.b64encode(img_byte_arr.getvalue()).decode("utf-8")

    except Exception:
        return None

def query_gemini(prompt, image_b64=None):
    url = f"https://generativelanguage.googleapis.com/v1/models/{GEMINI_MODEL}:generateContent?key={GEMINI_API_KEY}"
    parts = [{"text": prompt}]
    if image_b64:
        parts.append({
            "inline_data": {"mime_type": "image/jpeg", "data": image_b64}
        })
    
    try:
        response = requests.post(
            url,
            json={"contents": [{"parts": parts}]},
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        if response.status_code != 200:
            return None
        
        data = response.json()
        if "error" in data or not data.get("candidates"):
            return None
        
        return data["candidates"][0].get("content", {}).get("parts", [{}])[0].get("text", "")
    
    except requests.exceptions.RequestException:
        return None

@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([AllowAny])
def process_document(request):
    uploaded_file = request.FILES.get("file")
    if not uploaded_file:
        return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

    image_b64 = encode_file(uploaded_file)
    if not image_b64:
        return Response({"error": "Unsupported file format"}, status=status.HTTP_400_BAD_REQUEST)

    classify_prompt = (f"Classify this document into one of these categories: {', '.join(DOCUMENT_TYPES)}. "
                       "Respond only with the category name.")
    doc_type = query_gemini(classify_prompt, image_b64) or "Unclassified"

    extract_prompt = ("Extract key details including:\n- Names\n- Dates\n- Identification numbers\n- Locations\nFormat as a bullet-point list.")
    details = query_gemini(extract_prompt, image_b64) or "No details extracted"

    verify_prompt = "Analyze this document for signs of tampering. Provide verification status in short (2 lines)."
    verification = query_gemini(verify_prompt, image_b64) or "Verification failed"

    response_data = {
        "type": doc_type,
        "details": details,
        "verification": verification,
    }
    return JsonResponse(response_data)
