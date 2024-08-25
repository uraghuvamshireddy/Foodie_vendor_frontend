import React from 'react'

const Sidebar = ({showFirmHandler,showProductHandler,showAllProductsHandler,title,qrcodehandler })=> {
  return (
    <div className='sideBarSection'>
      <ul>
        {title ? <li onClick={showFirmHandler}>Add Firm</li> : ""}
        
        <li onClick={showProductHandler}>Add Product</li>
        <li onClick={showAllProductsHandler}>All Products</li>
        <li onClick={qrcodehandler}>Generate QR code</li>
      </ul>
    </div>
  )
}

export default Sidebar
