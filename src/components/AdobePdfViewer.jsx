import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const AdobePdfViewer = ({ pdfUrl }) => {
  const viewerRef = useRef(null);
  const adobeClientId = "0471542c40044f50a039da8a623c99d2"; 

  useEffect(() => {
    if (!pdfUrl) return;

    if (window.AdobeDC) {
      const adobeDCView = new window.AdobeDC.View({
        clientId: adobeClientId,
        divId: "adobe-pdf-viewer",
      });

      adobeDCView.previewFile(
        {
          content: { location: { url: pdfUrl } },
          metaData: { fileName: "Sample.pdf" },
        },
        {
          showAnnotationTools: true,
          enableFormFilling: true,
        }
      );
    } else {
      document.addEventListener("adobe_dc_view_sdk.ready", () => {
        const adobeDCView = new window.AdobeDC.View({
          clientId: adobeClientId,
          divId: "adobe-pdf-viewer",
        });

        adobeDCView.previewFile(
          {
            content: { location: { url: pdfUrl } },
            metaData: { fileName: "Sample.pdf" },
          },
          {
            showAnnotationTools: true,
            enableFormFilling: true,
          }
        );
      });
    }
  }, [pdfUrl]);

  return (
    <div>
      <h2>Adobe Acrobat PDF Viewer</h2>
      <div
        id="adobe-pdf-viewer"
        ref={viewerRef}
        style={{ width: "100%", height: "600px" }}
      ></div>
    </div>
  );
};

AdobePdfViewer.propTypes = {
  pdfUrl: PropTypes.string.isRequired,
};

export default AdobePdfViewer;
