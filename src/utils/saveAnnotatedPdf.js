import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";

const saveAnnotatedPdf = async (file, highlights) => {
  if (!highlights.length) {
    alert("No highlights to save.");
    return;
  }

  const existingPdfBytes = await fetch(file).then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const pages = pdfDoc.getPages();

  highlights.forEach((highlight, index) => {
    const page = pages[0]; // Add annotations to the first page
    const { x, y, width, height } = highlight.position;

    // ✅ Draw highlight rectangle
    page.drawRectangle({
      x: x - 50,
      y: y - 500,
      width,
      height,
      color: rgb(1, 1, 0),
      opacity: 0.5,
    });

    // ✅ Embed clickable annotation
    page.drawText(highlight.text, {
      x: x - 50,
      y: y - 480,
      size: 12,
      color: rgb(0, 0, 1),
    });

    page.drawText(`🔍 Comment: ${highlight.comment}`, {
      x: 50,
      y: 700 - index * 20,
      size: 10,
      color: rgb(1, 0, 0),
    });
  });

  const modifiedPdfBytes = await pdfDoc.save();
  const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
  saveAs(blob, "annotated.pdf");
};

export default saveAnnotatedPdf;
