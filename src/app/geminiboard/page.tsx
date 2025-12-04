
'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

export default function GeminiBoardPage() {
  useEffect(() => {
    // We need to ensure that the main script runs after the component is mounted
    // and all external scripts are loaded. A small delay can help.
    const timer = setTimeout(() => {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://aistudiocdn.com/geminiboard@^1.2.0';
      document.body.appendChild(script);
    }, 100);

    return () => {
      clearTimeout(timer);
      // Clean up script if component unmounts
      const existingScript = document.querySelector('script[src="https://aistudiocdn.com/geminiboard@^1.2.0"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js" strategy="beforeInteractive" />
      <Script id="pdf-worker-setup" strategy="afterInteractive">
        {`
          if (window.pdfjsLib) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          }
        `}
      </Script>
      <Script type="importmap" id="importmap" strategy="beforeInteractive">
        {`
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
        `}
      </Script>
      <style>
        {`
          body, html, #root {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
          #root {
            background: #f8fafc;
          }
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
        `}
      </style>
      <div id="root" style={{ height: 'calc(100vh - 4rem)' /* Adjust for header */ }}></div>
    </>
  );
}
