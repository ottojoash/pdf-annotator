import  { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import { v4 as uuidv4 } from "uuid";
import workerSrc from "pdfjs-dist/build/pdf.worker?url"; // ✅ Import the correct worker
// import PropTypes from "prop-types";
import "../styles/PdfViewer.css";
import PropTypes from "prop-types";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
// ✅ Set correct worker source
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
// import React, { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";


// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ file }) => {
    const [numPages, setNumPages] = useState(null);
    const [comments, setComments] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem("pdfComments")) || [];
      } catch (error) {
        console.error("Error parsing comments from localStorage:", error);
        return [];
      }
    });
    const [selectedText, setSelectedText] = useState("");
    const [commentInput, setCommentInput] = useState("");
    const [highlightedTexts, setHighlightedTexts] = useState(new Set());
  
    useEffect(() => {
      localStorage.setItem("pdfComments", JSON.stringify(comments));
    }, [comments]);
  
    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
    };
  
    const handleTextSelection = () => {
      const selection = window.getSelection();
      if (selection.toString()) {
        setSelectedText(selection.toString());
      }
    };
  
    const handleAddComment = () => {
      if (selectedText && commentInput) {
        setComments([...comments, { text: selectedText, comment: commentInput }]);
        setHighlightedTexts(new Set([...highlightedTexts, selectedText]));
        setSelectedText("");
        setCommentInput("");
      }
    };
  
    return (
      <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
        <div style={{ flex: 3, overflow: "auto" }} onMouseUp={handleTextSelection}>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
        <div style={{ flex: 1, padding: "10px", borderLeft: "1px solid #ccc", background: "black" }}>
          <h3>Comments</h3>
          {selectedText && !highlightedTexts.has(selectedText) && (
            <div>
              <h4>Selected Text:</h4>
              <p>{selectedText}</p>
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Add a comment"
              />
              <button onClick={handleAddComment}>Save Comment</button>
            </div>
          )}
          <div>
            {comments.map((c, index) => (
              <div key={index}>
                <strong>{c.text}:</strong> {c.comment}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
PDFViewer.propTypes = {
  file: PropTypes.string.isRequired,
};

export default PDFViewer;
