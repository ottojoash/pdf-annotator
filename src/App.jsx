import { useState } from "react";
import AdobePdfViewer from "./components/AdobePdfViewer";

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
      {pdfUrl && <AdobePdfViewer pdfUrl={pdfUrl} />}
    </div>
  );
}

export default App;
