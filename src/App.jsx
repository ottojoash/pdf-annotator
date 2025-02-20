import { useState } from "react";
import PDFViewer from "./components/PdfViewer";

function App() {
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setPdfUrl(fileUrl);
    }
  };

  return (
    <div className="app">
      <h1>Adobe Acrobat PDF Annotator</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {pdfUrl && <PDFViewer file={pdfUrl} />}
    </div>
  );
}

export default App;
