

const generateAnnotatedPdf = async (pdfBytes, highlights) => {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();

  highlights.forEach((highlight) => {
    const { x, y, width, height } = highlight.position;
    const page = pages[highlight.pageNumber - 1];

    // Draw a yellow rectangle for the highlight
    page.drawRectangle({
      x: x,
      y: page.getHeight() - y - height, // PDF coordinates start from bottom-left
      width: width,
      height: height,
      color: rgb(1, 1, 0),
      opacity: 0.5,
    });

    // Add the comment as text near the highlight
    page.drawText(highlight.comment, {
      x: x,
      y: page.getHeight() - y - height - 10, // Adjust position as needed
      size: 10,
      color: rgb(0, 0, 0),
    });
  });

  const modifiedPdfBytes = await pdfDoc.save();
  return modifiedPdfBytes;
};