"use client";

import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set worker source (using CDN for reliability in Next.js)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
    file: string;
}

export default function PDFViewer({ file }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);

    // ─── HANDLE RESPONSIVENESS ───
    useEffect(() => {
        const updateWidth = () => {
            const container = document.querySelector(".work-modal-pdf");
            if (container) {
                setContainerWidth(container.clientWidth - 40); // 20px padding each side
            }
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    return (
        <div className="pdf-viewer-container">
            <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                    <div className="pdf-loading">
                        <div className="pdf-spinner"></div>
                        <p>Loading Deck...</p>
                    </div>
                }
                error={
                    <div className="pdf-error">
                        <p>Failed to load PDF. Please try again.</p>
                    </div>
                }
            >
                {numPages &&
                    Array.from(new Array(numPages), (el, index) => (
                        <div key={`page_wrapper_${index + 1}`} className="pdf-page-wrapper">
                            <Page
                                pageNumber={index + 1}
                                width={containerWidth > 0 ? containerWidth : undefined}
                                loading={""}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                className="pdf-page"
                            />
                        </div>
                    ))}
            </Document>
        </div>
    );
}
