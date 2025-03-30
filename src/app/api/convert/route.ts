import { NextResponse } from 'next/server';
import { join } from 'path';
import { PythonShell } from 'python-shell';
import { unlink } from 'fs/promises';

interface ConversionRequest {
  inputFile: string;
  outputFormat: string;
}

export async function POST(request: Request) {
  try {
    const body: ConversionRequest = await request.json();
    const { inputFile, outputFormat } = body;

    if (!inputFile || !outputFormat) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const inputPath = join(process.cwd(), 'uploads', inputFile);
    const outputPath = join(
      process.cwd(),
      'uploads',
      `${inputFile.split('.')[0]}.${outputFormat}`
    );

    // Determine which Python script to run based on conversion type
    let scriptPath: string;
    let options: any = {
      mode: 'text',
      pythonPath: 'python',
      pythonOptions: ['-u'],
      scriptPath: '',
      args: [inputPath, outputPath],
    };

    if (outputFormat === 'pdf') {
      scriptPath = join(process.cwd(), 'scripts', 'convert_to_pdf.py');
    } else if (outputFormat === 'docx') {
      scriptPath = join(process.cwd(), 'scripts', 'convert_to_docx.py');
    } else if (outputFormat === 'pptx') {
      scriptPath = join(process.cwd(), 'scripts', 'convert_to_pptx.py');
    } else {
      return NextResponse.json(
        { error: 'Unsupported output format' },
        { status: 400 }
      );
    }

    options.scriptPath = scriptPath;

    // Run the conversion script
    const result = await PythonShell.run(scriptPath, options);

    // Clean up the input file after successful conversion
    await unlink(inputPath);

    return NextResponse.json({
      success: true,
      outputFile: outputPath.split('/').pop(),
      message: 'File converted successfully',
    });
  } catch (error) {
    console.error('Error converting file:', error);
    return NextResponse.json(
      { error: 'Error converting file' },
      { status: 500 }
    );
  }
} 