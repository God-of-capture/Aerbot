import sys
import os
from pdf2docx import Converter
from docx import Document
from PIL import Image
import pytesseract
import pythoncom
import win32com.client

def convert_to_docx(input_path, output_path):
    file_extension = os.path.splitext(input_path)[1].lower()
    
    try:
        if file_extension == '.pdf':
            # Convert PDF to DOCX
            cv = Converter(input_path)
            cv.convert(output_path)
            cv.close()
        elif file_extension in ['.jpg', '.jpeg', '.png']:
            # Convert image to DOCX using OCR
            image = Image.open(input_path)
            text = pytesseract.image_to_string(image)
            
            doc = Document()
            doc.add_paragraph(text)
            doc.save(output_path)
        elif file_extension == '.pptx':
            # Convert PPTX to DOCX using PowerPoint
            pythoncom.CoInitialize()
            powerpoint = win32com.client.Dispatch("PowerPoint.Application")
            powerpoint.Visible = True
            presentation = powerpoint.Presentations.Open(input_path)
            
            # Create a new Word document
            word = win32com.client.Dispatch("Word.Application")
            word.Visible = True
            doc = word.Documents.Add()
            
            # Copy content from each slide
            for slide in presentation.Slides:
                # Add slide title
                if slide.Shapes.Title:
                    doc.Content.InsertAfter(slide.Shapes.Title.TextFrame.TextRange.Text + "\n\n")
                
                # Add slide content
                for shape in slide.Shapes:
                    if shape.HasTextFrame and shape.TextFrame.TextRange.Text.strip():
                        doc.Content.InsertAfter(shape.TextFrame.TextRange.Text + "\n")
                
                # Add page break after each slide
                doc.Content.InsertAfter("\n")
            
            # Save and close
            doc.SaveAs(output_path)
            doc.Close()
            word.Quit()
            presentation.Close()
            powerpoint.Quit()
            pythoncom.CoUninitialize()
        else:
            print(f"Unsupported file format: {file_extension}")
            sys.exit(1)
            
        print(f"Successfully converted {input_path} to DOCX")
        
    except Exception as e:
        print(f"Error converting file: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python convert_to_docx.py input_file output_file")
        sys.exit(1)
        
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    
    if not os.path.exists(input_path):
        print(f"Input file not found: {input_path}")
        sys.exit(1)
        
    convert_to_docx(input_path, output_path) 