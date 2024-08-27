
import React, { useState } from 'react';
import QRCode from 'react-qr-code';
// import htmlToImage from 'html-to-image';

function QrCodeGenerator() {
  const [url, setUrl] = useState('');
  const [qrIsVisible, setQrIsVisible] = useState(false);

  const generateQRCode = () => {
    setQrIsVisible(true);
  };

  // const downloadQRCodeById = async (qrCodeId) => {
  //   const qrCodeImage = await fetchQRCodeImage(qrCodeId);

  //   const blob = new Blob([qrCodeImage], { type: 'image/png' });

  //   const url = URL.createObjectURL(blob);
  
  //   const aEl = document.createElement('a');
  //   aEl.href = url;
  //   aEl.download = `QR_Code_${qrCodeId}.png`; 
  //   document.body.appendChild(aEl);
  //   aEl.click();
  //   document.body.removeChild(aEl);

  //   URL.revokeObjectURL(url);
  // };
  
  
const firmId=localStorage.getItem('firmId');
  return (
    <div className='qr'>
      {/* <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      /> */}
  {/* <NavLink to={`/${firmId}/menu`}>  */}
 <div className='gen'> <button onClick={generateQRCode}>Generate QR Code</button></div> 
   {/* </NavLink> */}
      {qrIsVisible && (
        <div id="qr-code">
                {/* <QRCode value="localhost:5173/firmId/menu" /> */}

          <QRCode  id="qrCodeEl" value={`https://enchanting-manatee-dd5c07.netlify.app/${firmId}/menu`} />
          {/* <button onClick={downloadQRCode()}>Download QR Code</button> */}
        </div>
      )}
    </div>
  );
}

export default QrCodeGenerator;


