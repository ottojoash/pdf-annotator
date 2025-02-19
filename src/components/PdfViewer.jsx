import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { v4 as uuidv4 } from "uuid";
import workerSrc from "pdfjs-dist/build/pdf.worker?url"; // ✅ Import the correct worker
import PropTypes from "prop-types";
import "../styles/PdfViewer.css";
// ✅ Set correct worker source
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
const PdfViewer = ({ file, highlights, setHighlights }) => {
    const [numPages, setNumPages] = useState(null);
    const textLayerRefs = useRef([]);
  
    useEffect(() => {
      textLayerRefs.current = textLayerRefs.current.slice(0, numPages);
    }, [numPages]);
  
    const handleTextSelection = () => {
      const selection = window.getSelection();
      const selectedText = selection.toString().trim();
  
      if (selectedText) {
        const comment = prompt("Enter your annotation:");
        if (comment) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
  
          setHighlights([
            ...highlights,
            {
              id: uuidv4(),
              text: selectedText,
              comment: comment,
              page: selection.anchorNode?.parentElement?.dataset?.pageNumber || 1,
              position: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
            },
          ]);
        }
      }
    };
  
    return (
      <div className="pdf-container" onMouseUp={handleTextSelection}>
        <Document file={file} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={index}
              pageNumber={index + 1}
              className="pdf-page"
              renderTextLayer
              renderAnnotationLayer
              customTextRenderer={(textItem) => (
                <span
                  data-page-number={index + 1}
                  style={{
                    backgroundColor: highlights.some((h) => h.text === textItem.str)
                      ? "yellow"
                      : "transparent",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const highlight = highlights.find((h) => h.text === textItem.str);
                    if (highlight) alert(`Comment: ${highlight.comment}`);
                  }}
                >
                  {textItem.str}
                </span>
              )}
            />
          ))}
        </Document>
  
        <div className="annotations">
          <h3>Annotations</h3>
          <ul>
            {highlights.map((highlight) => (
              <li key={highlight.id} onClick={() => alert(`Comment: ${highlight.comment}`)}>
                <b>{highlight.text}</b>: {highlight.comment} (Page {highlight.page})
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  PdfViewer.propTypes = {
    file: PropTypes.string.isRequired,
    highlights: PropTypes.array.isRequired,
    setHighlights: PropTypes.func.isRequired,
  };
  
  export default PdfViewer;