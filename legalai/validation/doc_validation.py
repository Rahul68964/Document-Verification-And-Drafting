import cv2
import numpy as np
import fitz  # PyMuPDF for PDF processing
import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.models import load_model
import os
from tkinter import Tk, filedialog
from PIL import Image

# Open File Dialog
def select_file():
    Tk().withdraw()  # Hide root window
    file_path = filedialog.askopenfilename(title="Select an image or PDF",
                                           filetypes=[("PDF Files", "*.pdf"),
                                                      ("Image Files", "*.png;*.jpg;*.jpeg")])
    return file_path

# Convert PDF to Image
def pdf_to_image(pdf_path):
    doc = fitz.open(pdf_path)
    images = []
    for page in doc:
        pix = page.get_pixmap()
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        img = img.resize((224, 224))  # Resize for model input
        images.append(np.array(img))
    return images

# Process Image Files
def process_image(img_path):
    img = cv2.imread(img_path)
    img = cv2.resize(img, (224, 224))
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    return np.array(img)

# Load File
filename = select_file()

if filename.endswith(".pdf"):
    images = pdf_to_image(filename)
elif filename.endswith((".png", ".jpg", ".jpeg")):
    images = [process_image(filename)]
else:
    print("Unsupported file format")
    exit()

# Convert to Numpy Array and Normalize
X_data = np.array(images) / 255.0

# Load Pretrained MobileNetV2 Model (Feature Extractor)
base_model = MobileNetV2(weights="imagenet", include_top=False, input_shape=(224, 224, 3))
model = tf.keras.Sequential([
    base_model,
    tf.keras.layers.GlobalAveragePooling2D(),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dropout(0.3),
    tf.keras.layers.Dense(1, activation='sigmoid')  # Binary classification
])

# Freeze Pretrained Layers
for layer in base_model.layers:
    layer.trainable = False

# Compile Model
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Make Predictions
predictions = model.predict(X_data)
result = "Valid" if predictions[0] > 0.5 else "Invalid"
print("E-Signature Detection Result:", result)
