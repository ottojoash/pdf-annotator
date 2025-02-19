import  { useState } from "react";
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
  const [comments, setComments] = useState([]);
  const [selectedText, setSelectedText] = useState("");
  const [commentInput, setCommentInput] = useState("");

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
      setSelectedText("");
      setCommentInput("");
    }
  };

  return (
    <div>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} onMouseUp={handleTextSelection} />
        ))}
      </Document>
      {selectedText && (
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
        <h3>Comments</h3>
        {comments.map((c, index) => (
          <div key={index}>
            <strong>{c.text}:</strong> {c.comment}
          </div>
        ))}
      </div>
    </div>
  );
};
PDFViewer.propTypes = {
  file: PropTypes.string.isRequired,
};

export default PDFViewer;
