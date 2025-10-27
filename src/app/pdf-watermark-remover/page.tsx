
'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud, FileDown, Loader2, File as FileIcon, X, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

type ProcessingState = 'idle' | 'selected' | 'processing' | 'completed' | 'error';

export default function PdfWatermarkRemoverPage() {
  const [file, setFile] = useState<File | null>(null);
  const [processingState, setProcessingState] = useState<ProcessingState>('idle');
  const [processedFileUrl, setProcessedFileUrl] = useState<string | null>(null);
  const [downloadFileName, setDownloadFileName] = useState('processed.pdf');
  const [isPending, startTransition] = useTransition();
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setDownloadFileName(selectedFile.name.replace('.pdf', '_processed.pdf'));
        setProcessingState('selected');
        setProcessedFileUrl(null);
      } else {
        // Simple error handling for non-PDF files
        alert('Please select a PDF file.');
      }
    }
  };

  const handleRemoveWatermark = async () => {
    if (!file) return;
    setProcessingState('processing');
    setProcessedFileUrl(null);
    setProgress(0);

    // Simulate AI processing with progress updates
    const progressInterval = setInterval(() => {
        setProgress(prev => {
            if (prev >= 90) {
                clearInterval(progressInterval);
                return 90;
            }
            return prev + 10;
        })
    }, 200);

    startTransition(async () => {
      await new Promise(resolve => setTimeout(resolve, 2500)); // Simulate network/processing delay

      clearInterval(progressInterval);
      setProgress(100);

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
      setProcessingState('completed');
    });
  };

  const resetState = () => {
    setFile(null);
    setProcessingState('idle');
    setProcessedFileUrl(null);
    setProgress(0);
  };

  const renderContent = () => {
    switch (processingState) {
        case 'selected':
            return (
                <div className='text-center p-6'>
                    <FileIcon className="mx-auto size-16 text-primary" />
                    <p className="mt-4 font-semibold text-foreground">{file?.name}</p>
                    <p className="text-sm text-muted-foreground">{file && `${(file.size / 1024 / 1024).toFixed(2)} MB`}</p>
                    <div className='flex gap-2 mt-6'>
                        <Button variant="outline" onClick={resetState} className="w-full">
                            <X className='mr-2 size-4'/> Cancel
                        </Button>
                        <Button onClick={handleRemoveWatermark} className="w-full">
                            Remove Watermark
                        </Button>
                    </div>
                </div>
            )
        case 'processing':
            return (
                <div className='text-center p-6'>
                    <Loader2 className="mx-auto size-16 text-primary animate-spin" />
                    <p className="mt-4 font-semibold text-foreground">Processing...</p>
                    <p className="text-sm text-muted-foreground">{file?.name}</p>
                    <Progress value={progress} className="w-full mt-4" />
                    <p className="text-sm text-muted-foreground mt-2">{progress}%</p>
                </div>
            )
        case 'completed':
            return (
                 <div className='text-center p-6'>
                    <CheckCircle className="mx-auto size-16 text-green-500" />
                    <p className="mt-4 font-semibold text-foreground">Watermark Removed!</p>
                    <p className="text-sm text-muted-foreground">{file?.name}</p>
                    {processedFileUrl && (
                        <a href={processedFileUrl} download={downloadFileName} className='block w-full mt-6'>
                            <Button className="w-full">
                                <FileDown className="mr-2 h-4 w-4" />
                                Download PDF
                            </Button>
                        </a>
                    )}
                    <Button variant="outline" onClick={resetState} className="w-full mt-2">
                        Process another file
                    </Button>
                </div>
            )
        case 'idle':
        default:
            return (
                <>
                    <CardHeader className="text-center">
                        <UploadCloud className="mx-auto size-16 text-primary" />
                        <CardTitle className="text-2xl font-bold font-headline mt-4">PDF Watermark Remover</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Remove watermarks from your PDF files for free, with no quality loss.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 px-6 pb-6">
                        <div className="relative">
                            <Button className="w-full h-16 text-lg" onClick={() => document.getElementById('pdf-upload')?.click()}>
                                Choose File
                            </Button>
                            <Input
                                id="pdf-upload"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                accept="application/pdf"
                            />
                        </div>
                        <p className="text-center text-sm text-muted-foreground">or drop files here</p>
                    </CardContent>
                </>
            );
    }
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <div 
        className="w-full max-w-lg"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
            e.preventDefault();
            const droppedFiles = e.dataTransfer.files;
            if (droppedFiles.length > 0) {
                // Manually trigger the file change handler
                handleFileChange({ target: { files: droppedFiles } } as unknown as React.ChangeEvent<HTMLInputElement>);
            }
        }}
        >
        <Card className={cn("transition-all duration-300", processingState !== 'idle' && "min-h-[20rem] flex items-center justify-center")}>
          {renderContent()}
        </Card>
      </div>
    </div>
  );
}
