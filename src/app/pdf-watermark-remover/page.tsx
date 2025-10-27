
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud, FileDown, Loader2 } from 'lucide-react';

export default function PdfWatermarkRemoverPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFileUrl, setProcessedFileUrl] = useState<string | null>(null);
  const [downloadFileName, setDownloadFileName] = useState('processed.pdf');


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setProcessedFileUrl(null);
      setDownloadFileName(selectedFile.name.replace('.pdf', '_processed.pdf'));
    }
  };

  const handleRemoveWatermark = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProcessedFileUrl(null);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Create a simple but valid PDF blob
    const pdfContent = `
%PDF-1.1
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792]
/Contents 4 0 R >>
endobj
4 0 obj
<< /Length 55 >>
stream
BT
/F1 12 Tf
100 700 Td
(This is a dummy processed PDF) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000010 00000 n 
0000000059 00000 n 
0000000118 00000 n 
0000000210 00000 n 
trailer
<< /Size 5 /Root 1 0 R >>
startxref
278
%%EOF
`;

    const blob = new Blob([pdfContent.trim()], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    setProcessedFileUrl(url);
    setIsProcessing(false);
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-bold font-headline">PDF Watermark Remover</CardTitle>
            <CardDescription className="text-muted-foreground md:text-xl">
              Upload your PDF file to remove the watermark using AI.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center space-y-4">
                <UploadCloud className="size-12 text-muted-foreground" />
                <p className="text-muted-foreground">Drag & drop your PDF here, or click to browse</p>
                <Input
                    id="pdf-upload"
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    accept="application/pdf"
                />
            </div>
            {file && (
              <div className="text-sm text-foreground">
                Selected file: <span className="font-medium">{file.name}</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <Button 
                onClick={handleRemoveWatermark} 
                disabled={!file || isProcessing}
                className="w-full"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Removing Watermark...
                </>
              ) : (
                'Remove Watermark'
              )}
            </Button>
            
            {processedFileUrl && (
              <a href={processedFileUrl} download={downloadFileName}>
                <Button variant="outline" className="w-full">
                  <FileDown className="mr-2 h-4 w-4" />
                  Download Processed PDF
                </Button>
              </a>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
