import React,{useState} from 'react'
import { API_URL } from '../../data/apipath';

const Login=({showWelcomeHandler})=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async(e)=>{
    e.preventDefault();
    try {
        const response = await fetch(`${API_URL}/vendor/login`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email,password})
        });
        const data = await response.json();
        if(response.ok){
            console.log(data);
            alert("Login successful");
         localStorage.setItem('loginToken',data.token)
            setEmail("");
            setPassword("");
            showWelcomeHandler();
            // window.location.reload();
            showWelcomeHandler();

        }
        const vendorId=data.vendorId;
        const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
        window.location.reload();
        const vendorData = await vendorResponse.json();
      console.log(vendorData);
        if(vendorResponse.ok){
            const vendorFirmId = vendorData.vendorFirmId;
            const vendorFirmName = vendorData.vendor.firm[0].firmName;
            localStorage.setItem('firmId',vendorFirmId);
            localStorage.setItem('firmName',vendorFirmName);
            window.location.reload();
        }
        else {
            setError(data.error);
            alert("Login Failed, Contact Admin")
        }
      }
     catch (error) {
        console.error("Login failed", error);
        alert("Login failed");
    }
 };
  return (
    <div className="loginSection">
   <form  className='authForm' onSubmit={loginHandler}>
        <h3>Vendor Login</h3>
            <label>Email</label>
            <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email' /><br />
            <label>Password</label>
            <input   type='password'  value={password} onChange={(e) => setPassword(e.target.value)} name='password' placeholder='enter your password'/><br />
         
    <div className="btnSubmit">
        <button type= 'submit'>Submit</button>
    </div>
        </form>
    </div>
  )
}

export default Login
