from django.urls import path
from .views import process_document  # Import the correct function

urlpatterns = [
    path('upload/', process_document, name='document-upload'),  
]

