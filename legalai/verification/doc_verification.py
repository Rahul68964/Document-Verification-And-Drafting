# LIVELINESS CHECKING PART - LEAVE IT FOR NOW

import os
import io
import json
import requests
import fitz  # PyMuPDF
from PIL import Image
from urllib.parse import urlparse

# Set API Key (Replace with your actual API key)
API_KEY = "YOUR_RAPIDAPI_KEY"

# Define Thresholds
screenReplayThreshold = 0.5
portraitReplaceThreshold = 0.5
printedCopyThreshold = 0.5


# Function to convert PDF to images
import os
import io
import json
import requests
import fitz  # PyMuPDF
from PIL import Image
from urllib.parse import urlparse

# API Key (Ensure you have a valid API key)
API_KEY = "your_rapidapi_key"

# Function to convert PDF pages to images
def pdf_to_image(pdf_path):
    parsed_url = urlparse(pdf_path)
    if parsed_url.scheme == "file":
        pdf_path = parsed_url.path.lstrip("/")

    pdf_path = os.path.abspath(pdf_path)

    if not os.path.exists(pdf_path):
        return None, {"status": "error", "message": f"File not found: {pdf_path}"}

    try:
        doc = fitz.open(pdf_path)
        images = []

        for page_num in range(len(doc)):
            pix = doc[page_num].get_pixmap()
            img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            images.append(img)

        return images, None  # Return list of images

    except Exception as e:
        return None, {"status": "error", "message": f"Error processing PDF: {str(e)}"}

# Function to check liveness
def check_liveness(image_path):
    parsed_url = urlparse(image_path)
    if parsed_url.scheme == "file":
        image_path = parsed_url.path.lstrip("/")

    image_path = os.path.abspath(image_path)

    if not os.path.exists(image_path):
        return json.dumps({"status": "error", "message": f"File not found: {image_path}"})

    try:
        img_bytes = io.BytesIO()
        with Image.open(image_path) as img:
            img.save(img_bytes, format="JPEG")
        img_bytes.seek(0)

        url = "https://recognito-iddocumentlivenessdetection.p.rapidapi.com/process_image"
        headers = {"X-RapidAPI-Key": API_KEY}
        files = {'image': img_bytes}

        response = requests.post(url, files=files, headers=headers)
        response_json = response.json()

        if response_json.get("resultCode") == "Error":
            return json.dumps({"status": "error", "message": "Server error"})

        return json.dumps(response_json, indent=4)

    except Exception as e:
        return json.dumps({"status": "error", "message": str(e)})

# Function for ID Card Recognition
def idcard_recognition(front_path, back_path=None):
    url = "https://recognito-iddocumentrecognition.p.rapidapi.com/api/read_idcard"
    headers = {"X-RapidAPI-Key": API_KEY}
    files = {}

    try:
        # Process front PDF if necessary
        if front_path.lower().endswith(".pdf"):
            front_images, error = pdf_to_image(front_path)
            if error:
                return json.dumps(error)

            front_image_io = io.BytesIO()
            front_images[0].save(front_image_io, format="JPEG")  # Save first page
            front_image_io.seek(0)
            files['image'] = ("front.jpg", front_image_io, "image/jpeg")

        elif os.path.exists(front_path):
            files['image'] = open(front_path, 'rb')

        # Process back PDF if provided
        if back_path and back_path.lower().endswith(".pdf"):
            back_images, error = pdf_to_image(back_path)
            if error:
                return json.dumps(error)

            back_image_io = io.BytesIO()
            back_images[0].save(back_image_io, format="JPEG")  # Save first page
            back_image_io.seek(0)
            files['image2'] = ("back.jpg", back_image_io, "image/jpeg")

        elif back_path and os.path.exists(back_path):
            files['image2'] = open(back_path, 'rb')

        if not files:
            return json.dumps({"status": "error", "message": "No valid images provided"})

        response = requests.post(url, files=files, headers=headers)
        response_data = response.json()

        if "data" in response_data:
            return json.dumps(response_data["data"], indent=4)
        else:
            return json.dumps({"status": "error", "message": "Invalid response from API", "response": response.text})

    except Exception as e:
        return json.dumps({"status": "error", "message": str(e)})

    finally:
        # Close opened files
        for file in files.values():
            if hasattr(file, "close"):
                file.close()

# Main function
if __name__ == "__main__":
    print("Select an option:")
    print("1. Liveness Check")
    print("2. ID Card Recognition")

    choice = input("Enter your choice (1/2): ").strip()

    if choice == "1":
        image_path = input("Enter the image file path: ").strip()
        result = check_liveness(image_path)

    elif choice == "2":
        front_path = input("Enter the front side image/PDF file path: ").strip()
        back_path = input("Enter the back side image/PDF file path (optional, press Enter to skip): ").strip() or None
        result = idcard_recognition(front_path, back_path)

    else:
        result = json.dumps({"status": "error", "message": "Invalid choice"})

    print("\nResult:")
    print(result)
