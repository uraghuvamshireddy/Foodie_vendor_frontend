
import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';


function QrCodeGenerator() {
  const [qrIsVisible, setQrIsVisible] = useState(false);
  const qrRef = useRef(null);

  const generateQRCode = () => {
    setQrIsVisible(true);
  };

const firmId=localStorage.getItem('firmId');

const downloadQRCode = () => {
  const svg =document.getElementById("qrCodeEl");
  if (!svg) return;

  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const link = document.createElement("a");
    link.download = "QRCode.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  img.src = "data:image/svg+xml;base64," + btoa(svgString);
};

  return (
    <div className='qr'>
 
 <div className='gen'> <button onClick={generateQRCode}>Generate QR Code</button></div> 
      {qrIsVisible && (
        <div id="qr-code">
          <QRCode  id="qrCodeEl" value={`https://enchanting-manatee-dd5c07.netlify.app/${firmId}/menu`} />
          {/* <QRCode  id="qrCodeEl" value={`http://localhost:4000/${firmId}/menu`} /> */}
        <div className="gen">          <button onClick={downloadQRCode} style={{ marginTop: "10px", padding: "8px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Download QR Code</button>
        </div>
        </div>
      )}
    </div>
  );
}

export default QrCodeGenerator;


