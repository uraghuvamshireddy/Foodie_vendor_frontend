import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [qrCodeText, setQRCodeText] = useState('');

  const generateQRCode = () => {
    setQRCodeText(inputText);
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById('qrCodeEl');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qr_code.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <h3>Generate and Download QR Code</h3>
      <input
        type="text"
        placeholder="Enter text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={generateQRCode}>Generate QR Code</button>
      <br />
      {qrCodeText && (
        <>
          <QRCode id="qrCodeEl" value={qrCodeText} size={150} />
          <br />
          <button onClick={downloadQRCode}>Download QR Code</button>
        </>
      )}
    </div>
  );
};

export default QRCodeGenerator;
