// import { useState } from "react";
import { PdfLoader, PdfHighlighter, Highlight, Popup } from "react-pdf-highlighter";
import PropTypes from "prop-types";
import "../styles/PdfAnnotator.css";

const PdfAnnotator = ({ file, highlights, setHighlights }) => {
  const addHighlight = (highlight) => {
    setHighlights([...highlights, highlight]);
  };

  return (
    <div className="pdf-annotator">
      <PdfLoader url={file} beforeLoad={<p>Loading PDF...</p>}>
        {(pdfDocument) => (
          <div className="pdf-container"> {/* ✅ Add absolutely positioned container */}
            <PdfHighlighter
              pdfDocument={pdfDocument}
              enableAreaSelection={() => true}
              onSelectionFinished={(position, content, hideTip) => {
                const comment = prompt("Enter your annotation:");
                if (comment) {
                  addHighlight({ position, content, comment });
                }
                hideTip();
              }}
              highlightTransform={(highlight, index) => (
                <Highlight key={index} position={highlight.position}>
                  <Popup content={highlight.comment} />
                </Highlight>
              )}
              highlights={highlights}
            />
          </div>
        )}
      </PdfLoader>
    </div>
  );
};

PdfAnnotator.propTypes = {
  file: PropTypes.string.isRequired,
  highlights: PropTypes.array.isRequired,
  setHighlights: PropTypes.func.isRequired,
};

export default PdfAnnotator;
