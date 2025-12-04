'use client';
import { useEffect } from 'react';

// This component will dynamically update the document's head and body.
export default function GeminiBoardPage() {
  useEffect(() => {
    // This is a workaround to inject a full HTML page structure into the Next.js app.
    // Normally, you would build this as a proper React component.
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>GeminiBoard</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
        <script>
          document.addEventListener('DOMContentLoaded', () => {
            if (window.pdfjsLib) {
              window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            }
          });
        </script>
        <style>
          /* Custom Scrollbar for a cleaner look */
          ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 3px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
          
          /* Dot grid background pattern */
          .bg-dot-grid {
            background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
            background-size: 20px 20px;
          }
        </style>
      <script type="importmap">
    {
      "imports": {
        "react/": "https://aistudiocdn.com/react@^19.2.0/",
        "react": "https://aistudiocdn.com/react@^19.2.0",
        "@google/genai": "https://aistudiocdn.com/@google/genai@^1.30.0",
        "uuid": "https://aistudiocdn.com/uuid@^13.0.0",
        "react-dom/": "https://aistudiocdn.com/react-dom@^19.2.0/",
        "lucide-react": "https://aistudiocdn.com/lucide-react@^0.555.0"
      }
    }
    </script>
    </head>
      <body class="bg-gray-50 text-slate-900 overflow-hidden selection:bg-blue-200">
        <div id="root"></div>
      </body>
    </html>
    `;

    if (typeof window !== 'undefined') {
        document.open();
        document.write(htmlContent);
        document.close();
    }
  }, []);

  return null; // This component's purpose is to rewrite the document.
}
