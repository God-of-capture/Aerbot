# Aerbot - AI-Powered Document Editor

A modern web application that helps students generate, modify, and convert files like PPTs, CVs, and Resumes using a chatbot-driven interface.

## Features

- 🤖 Chatbot-driven interface for intuitive file editing
- 📄 Support for multiple file formats (PPT, DOCX, PDF, JPG, PNG)
- 🔄 File conversion between different formats
- 🎨 Modern, responsive UI with dark mode support
- 📱 Mobile-friendly design
- 🔒 Secure file handling with automatic cleanup

## Tech Stack

### Frontend
- Next.js 13+ with App Router
- React
- Tailwind CSS
- Framer Motion
- Zustand (State Management)

### Backend
- Next.js API Routes
- Python (for file processing)
- Various Python libraries for file conversion

## Prerequisites

- Node.js 16+ and npm
- Python 3.8+
- Microsoft Office (for some file conversions)
- Tesseract OCR (for image text extraction)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/aerbot.git
cd aerbot
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Create an `uploads` directory in the project root:
```bash
mkdir uploads
```

5. Install Tesseract OCR:
- Windows: Download and install from [GitHub](https://github.com/UB-Mannheim/tesseract/wiki)
- Linux: `sudo apt-get install tesseract-ocr`
- macOS: `brew install tesseract`

## Development

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## File Conversion Support

The application supports the following file conversions:

- PDF → DOCX, PPTX
- DOCX → PDF, PPTX
- PPTX → PDF, DOCX
- JPG/PNG → PDF, DOCX (with OCR), PPTX

## Project Structure

```
aerbot/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── upload/
│   │   │   └── convert/
│   │   └── page.tsx
│   └── components/
│       ├── Chatbot.tsx
│       ├── FileUpload.tsx
│       ├── PPTEditor.tsx
│       └── ResumeEditor.tsx
├── scripts/
│   ├── convert_to_pdf.py
│   ├── convert_to_docx.py
│   └── convert_to_pptx.py
├── uploads/
├── requirements.txt
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Python](https://www.python.org/)
- All the Python libraries used in this project 