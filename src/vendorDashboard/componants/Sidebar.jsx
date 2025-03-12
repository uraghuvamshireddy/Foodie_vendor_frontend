import React from 'react'

const Sidebar = ({showFirmHandler,showProductHandler,showAllProductsHandler,title,qrcodehandler,orderhandler,comorderhandler})=> {
  return (
    <div className='sideBarSection'>
      <ul>
        {title ? <li onClick={showFirmHandler}>Add Firm</li> : ""}
        
        <li onClick={showProductHandler}>Add Product</li>
        <li onClick={showAllProductsHandler}>All Products</li>
        <li onClick={orderhandler}>View Orders</li>
        <li onClick={comorderhandler}>Completed Orders</li>
        <li onClick={qrcodehandler}>Generate QR code</li>
      </ul>
    </div>
  )
}

export default Sidebar
