import React, { useState,useEffect } from 'react'
import Navbar from '../componants/Navbar'
import Sidebar from '../componants/Sidebar'
import Login from '../componants/forms/Login'
import Register from '../componants/forms/Register'
import AddFirm from '../componants/forms/AddFirm'
import AddProduct from '../componants/forms/AddProduct'
import Welcome from '../componants/Welcome'
import AllProducts from '../componants/AllProducts'
import QRCodeGenerator from '../componants/Qrcode'
import Order from '../componants/Order'
import { use } from 'react'
import ComOrder from '../componants/ComOrder'


function LandingPage() {

  const [showLogin,setshowLogin] = useState(false);
  const [showRegister,setshowRegister] = useState(false);
  const [showFirm,setshowFirm] = useState(false);
  const [showProduct,setshowProduct] = useState(false);
  const [showWelcome,setshowWelcome] = useState(false);
  const [showAllProducts,setshowAllProducts] = useState(false);
  const [logout,setlogout] = useState(false);
  const [title,setTitle]=useState(true);
  const [qrcode,setqrcode] = useState(false);
  const [viewOrder,setviewOrder] = useState(false);
  const [comOrder, setcomOrder] = useState(false);

  useEffect(()=>{
    const loginToken = localStorage.getItem('loginToken')
    if(loginToken){
      setlogout(true)
    }

  },[])
  useEffect(()=>{
const firmName = localStorage.getItem('firmName');
if(firmName){
  setTitle(false);
}
  },[])
  const logoutHandler = ()=>{
    confirm("Are you sure to Logout")
    localStorage.removeItem('loginToken');
    localStorage.removeItem('firmId')
    localStorage.removeItem('firmName');
    setlogout(false);
    setTitle(true);
  }

const showLoginHandler = ()=>{
  setshowLogin(true);
  setshowRegister(false);
  setshowFirm(false);
  setshowProduct(false)
  setshowWelcome(false)
  setshowAllProducts(false);
  setqrcode(false);
  setviewOrder(false);
  setcomOrder(false);
}
const showRegisterHandler = ()=>{
  setshowRegister(true);
  setshowLogin(false);
  setshowFirm(false);
  setshowProduct(false)
  setshowWelcome(false)
  setqrcode(false);
  setviewOrder(false);
  setcomOrder(false);
  setshowAllProducts(false);
}
const showFirmHandler = ()=>{
  if(logout){
  setshowLogin(false);
  setshowFirm(true);
  setshowRegister(false);
  setshowProduct(false)
  setshowWelcome(false)
  setshowAllProducts(false);
  setqrcode(false);
  setviewOrder(false);
  setcomOrder(false);
  }
  else{
alert('Please LOGIN');
setshowLogin(true);
  }
}
const showProductHandler = ()=>{
  if(logout){
  setshowLogin(false);
  setshowFirm(false);
  setshowProduct(true);
  setshowRegister(false);
  setshowWelcome(false);
  setshowAllProducts(false);
  setqrcode(false);
  setviewOrder(false);
  setcomOrder(false);
  }
  else{
    alert('Please LOGIN');
    setshowLogin(true);
      }
}
const showWelcomeHandler=()=>{
  setshowLogin(false);
  setshowFirm(false);
  setshowProduct(false);
  setshowRegister(false);
  setshowWelcome(true)
  setshowAllProducts(false);
  setqrcode(false);
  setviewOrder(false);
  setcomOrder(false);
}

const showAllProductsHandler = ()=>{
  if(logout){
  setshowLogin(false);
  setshowFirm(false);
  setshowProduct(false);
  setshowRegister(false);
  setshowWelcome(false);
  setshowAllProducts(true);
  setqrcode(false);
  setviewOrder(false);
  setcomOrder(false);
  }
  else{
    alert('Please LOGIN');
    setshowLogin(true);
      }
}
const qrcodehandler = ()=>{
  if(logout){
  setshowLogin(false);
  setshowFirm(false);
  setshowProduct(false);
  setshowRegister(false);
  setshowWelcome(false);
  setshowAllProducts(false);
  setviewOrder(false);
  setcomOrder(false);
  setqrcode(true);
  }
  else{
    alert('Please LOGIN');
    setshowLogin(true);
      }
}
const orderhandler = ()=>{
  if(logout){
  setshowLogin(false);
  setshowFirm(false);
  setshowProduct(false);
  setshowRegister(false);
  setshowWelcome(false);
  setshowAllProducts(false);
  setviewOrder(true);
  setqrcode(false);
  setcomOrder(false);
  }
  else{
    alert('Please LOGIN');
    setshowLogin(true);
      }
}
const comorderhandler = ()=>{
  if(logout){
  setshowLogin(false);
  setshowFirm(false);
  setshowProduct(false);
  setshowRegister(false);
  setshowWelcome(false);
  setshowAllProducts(false);
  setviewOrder(false);
  setqrcode(false);
  setcomOrder(true);
  }
  else{
    alert('Please LOGIN');
    setshowLogin(true);
      }
}
  return (
   <>
   <section className='landingsection'>
    <Navbar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} logout = {logout} logoutHandler={logoutHandler} />
    
    <div className="collectionSection">
    <Sidebar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler}  showAllProductsHandler={showAllProductsHandler} title={title} qrcodehandler={qrcodehandler} orderhandler={orderhandler} comorderhandler={comorderhandler}/>
    {showLogin&&<Login showWelcomeHandler={showWelcomeHandler}/>}
    {showRegister&& <Register showLoginHandler={showLoginHandler}/> }
    {showFirm  && logout&& <AddFirm /> }
    {showProduct && logout && <AddProduct /> }
    {showWelcome && logout && <Welcome />}
    {showAllProducts  && logout&& <AllProducts />}
    {qrcode && logout && <QRCodeGenerator/>}
    {viewOrder && logout && <Order />}
    {comOrder && logout && <ComOrder />}
    </div>
   </section>
   </>
  )
}

export default LandingPage
