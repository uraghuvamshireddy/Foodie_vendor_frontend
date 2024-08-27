
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import QRCode from 'react-qr-code';
// import htmlToImage from 'html-to-image';

function QrCodeGenerator() {
  const [url, setUrl] = useState('');
  const [qrIsVisible, setQrIsVisible] = useState(false);

  const generateQRCode = () => {
    setQrIsVisible(true);
  };

  // const downloadQRCode = () => {
  //   htmlToImage.toPng(document.getElementById('qr-code'))
  //     .then((dataUrl) => {
  //       const link = document.createElement('a');
  //       link.href = dataUrl;
  //       link.download = 'qrcode.png';
  //       link.click();
  //     });
  // };
const firmId=localStorage.getItem('firmId');
  return (
    <div>
      {/* <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      /> */}
  {/* <NavLink to={`/${firmId}/menu`}>  */}
   <button onClick={generateQRCode}>Generate QR Code</button>
   {/* </NavLink> */}
      {qrIsVisible && (
        <div id="qr-code">
                {/* <QRCode value="localhost:5173/firmId/menu" /> */}

          <QRCode value="https://enchanting-manatee-dd5c07.netlify.app/firmId/menu" />
          {/* <button onClick={downloadQRCode}>Download QR Code</button> */}
        </div>
      )}
    </div>
  );
}

export default QrCodeGenerator;


