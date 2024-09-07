// components/PdfViewer.js
import React from 'react';

const PdfViewer = ({ pdfUrl }) => {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'auto' }}>
      <iframe
        src={pdfUrl}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="PDF Viewer"
      />
    </div>
  );
};

export default PdfViewer;
