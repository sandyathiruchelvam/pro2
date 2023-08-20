import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [pdfData, setPdfData] = useState(null);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(text, 10, 10);
    
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);

    setPdfData(pdfUrl);
  };

  const sharePDFOnWhatsApp = () => {
    if (pdfData) {
      const shareUrl = `whatsapp://send?text=Check out this PDF: ${encodeURIComponent(pdfData)}`;
      window.location.href = shareUrl;
    }
  };

  return (
    <div className='container'>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        cols={50}
        placeholder='enter your text'
      />
      <button onClick={generatePDF}style={{ backgroundColor: ' #D62A21'}}>Generate PDF</button>
      <button onClick={sharePDFOnWhatsApp} style={{ backgroundColor: '#3DE34F' }}>Share PDF on WhatsApp</button>
      {pdfData && <iframe title="pdfPreview" src={pdfData} width="100%" height="500px" />}
    </div>
  );
}

export default App;