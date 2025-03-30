import sys
import os
from docx2pdf import convert
from pdf2docx import Converter
from pdf2image import convert_from_path
from PIL import Image
import pythoncom
import win32com.client

def convert_to_pdf(input_path, output_path):
    file_extension = os.path.splitext(input_path)[1].lower()
    
    try:
        if file_extension in ['.docx', '.doc']:
            # Convert DOCX to PDF
            convert(input_path, output_path)
        elif file_extension == '.pptx':
            # Convert PPTX to PDF using PowerPoint
            pythoncom.CoInitialize()
            powerpoint = win32com.client.Dispatch("PowerPoint.Application")
            powerpoint.Visible = True
            presentation = powerpoint.Presentations.Open(input_path)
            presentation.SaveAs(output_path, 32)  # 32 is the PDF format code
            presentation.Close()
            powerpoint.Quit()
            pythoncom.CoUninitialize()
        elif file_extension in ['.jpg', '.jpeg', '.png']:
            # Convert image to PDF
            image = Image.open(input_path)
            if image.mode in ['RGBA', 'LA']:
                background = Image.new('RGB', image.size, (255, 255, 255))
                background.paste(image, mask=image.split()[-1])
                image = background
            image.save(output_path, 'PDF', resolution=100.0)
        else:
            print(f"Unsupported file format: {file_extension}")
            sys.exit(1)
            
        print(f"Successfully converted {input_path} to PDF")
        
    except Exception as e:
        print(f"Error converting file: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python convert_to_pdf.py input_file output_file")
        sys.exit(1)
        
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    
    if not os.path.exists(input_path):
        print(f"Input file not found: {input_path}")
        sys.exit(1)
        
    convert_to_pdf(input_path, output_path) 