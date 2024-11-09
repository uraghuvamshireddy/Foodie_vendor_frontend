
import React, { useState } from 'react';
import QRCode from 'react-qr-code';
// import htmlToImage from 'html-to-image';

function QrCodeGenerator() {
  const [url, setUrl] = useState('');
  const [qrIsVisible, setQrIsVisible] = useState(false);

  const generateQRCode = () => {
    setQrIsVisible(true);
  };


  
  
const firmId=localStorage.getItem('firmId');
  return (
    <div className='qr'>
 
 <div className='gen'> <button onClick={generateQRCode}>Generate QR Code</button></div> 
      {qrIsVisible && (
        <div id="qr-code">
                <QRCode value="localhost:5173/firmId/menu" />

          {/* <QRCode  id="qrCodeEl" value={`https://enchanting-manatee-dd5c07.netlify.app/${firmId}/menu`} /> */}
          {/* <button onClick={downloadQRCode()}>Download QR Code</button> */}
        </div>
      )}
    </div>
  );
}

export default QrCodeGenerator;


