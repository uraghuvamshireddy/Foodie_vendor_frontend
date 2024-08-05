import React, { useState } from 'react'
import { API_URL } from '../../data/apipath';

const Register=({showLoginHandler})=> {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); 
    const [showPassword, setShowPassword] = useState(false);

 const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
        const response = await fetch(`${API_URL}/vendor/register`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username,email,password})
        });
        const data = await response.json();
        if(response.ok){
            console.log(data);
            setUsername("");
            setEmail("");
            setPassword("");
            alert("Registered successfully");
            showLoginHandler();
        }
        else {
            setError(data.error);
            alert("Registration Failed, Contact Admin")
        }
    } catch (error) {
        console.error("Registration failed", error);
        alert("Registration failed");
    }
 };

  return (
    <div className='registerSection'>
        <form  className='authForm' onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>
            <label>Username</label>
            <input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='enter your name'/><br />
            <label>Email</label>
            <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email'/><br />
            <label>Password</label>
            <input   type='password' value={password} onChange={(e) => setPassword(e.target.value)} name='password' placeholder='enter your password'/><br />
         
    <div className="btnSubmit">
        <button type= 'submit'>Submit</button>
    </div>
        </form>
    </div>
  )
}

export default Register
