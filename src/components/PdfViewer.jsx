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

const PDFViewer = ({ file }) => {
    const [numPages, setNumPages] = useState(null);
    const [comments, setComments] = useState(() => {
      return localStorage.getItem("pdfComments") || "";
    });
  
    useEffect(() => {
      localStorage.setItem("pdfComments", comments);
    }, [comments]);
  
    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
    };
  
    return (
      <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
        <div style={{ flex: 3, overflow: "auto" }}>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
        <div style={{ flex: 1, padding: "10px", borderLeft: "1px solid #ccc", background: "#f8f8f8" }}>
          <h3>Comments</h3>
          <textarea
            style={{ width: "100%", height: "90%", padding: "10px" }}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Write your suggestions here..."
          />
        </div>
      </div>
    );
  };
  
PDFViewer.propTypes = {
  file: PropTypes.string.isRequired,
};

export default PDFViewer;
