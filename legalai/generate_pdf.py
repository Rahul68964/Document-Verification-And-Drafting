import pdfkit
import os  # Import the 'os' module

def save_as_pdf(doc_type, content):
    file_path = f"{doc_type.replace(' ', '_')}.pdf"
    options = {
        'page-size': 'Letter',
        'margin-top': '0.75in',
        'margin-right': '0.75in',
        'margin-bottom': '0.75in',
        'margin-left': '0.75in',
        'encoding': "UTF-8",
        'quiet': ''
    }

    # Option 1: Explicitly specify the path to wkhtmltopdf (if needed)
    # If pdfkit can't find wkhtmltopdf on its own, uncomment and adjust the path:
    # config = pdfkit.configuration(wkhtmltopdf="C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe") # Example Windows path
    # pdfkit.from_string(content, file_path, options=options, configuration=config)

    # Option 2: Let pdfkit find it on its own (if it's in your PATH)
    try:
        pdfkit.from_string(content, file_path, options=options)
    except OSError as e:
        print(f"Error generating PDF: {e}")
        print("Please ensure wkhtmltopdf is installed and in your system's PATH, or provide the full path in the configuration.")
        return None  # Or raise the exception if you want the app to stop

    return file_path
