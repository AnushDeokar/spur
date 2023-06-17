import React, { useState } from 'react'
import "../App.css"
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const back_url = process.env.REACT_APP_BACKEND_URL;
function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState({
        iserror:false,
        msg:""
    })

    const [details, setDetails] = useState({
        username:"",
        password:""
    });

    const handleChange = (e)=>{
        e.preventDefault();
        setDetails({...details, [e.target.name]:e.target.value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (details.username.length<=5){
            console.log(details.username)
            setError({iserror:true, msg:"Username should be atleast 5 characters long"});
        }else if(details.password.length<=5){
            setError({iserror:true, msg:"Password should be atleast 5 characters long"});
        }else{
            try{
                const res = await axios.post(`${back_url}/auth/login`,  {username: details.username, password: details.password}, { withCredentials: true })
                console.log("login res", res);
                if (!res.data.success){
                    setError({iserror:true, msg:res.data.msg});
                }else{
                    localStorage.setItem("isAuthenticated", true);
                    localStorage.setItem("name", res.data.name);
                    localStorage.setItem("username", res.data.username);
                    localStorage.setItem("token", res.data.token);
                    navigate("/");
                }
                console.log(res);
            }catch (err){
                console.log(err);
            }
            
        }
    }

  return (
    <div className='h-screen auth_template text-center'>
        <h1>VirtuArtGalerie</h1>
        {error.iserror?<p className='error_msg'>{error.msg}</p>:<></>}
        <div className='w-1/4 auth_template_card'>
            <h2 style={{color:"white"}}>Login</h2>
            <div className='flex-column'>
            <input type="text"placeholder='Username' name="username" onChange={handleChange} value={details.username} className='auth_input'/>
            <input type="password" placeholder='Password' name="password" onChange={handleChange} value={details.password} className='auth_input'/>
            <button className='auth_btn' onClick={handleSubmit}>Login</button>
            </div>
        </div>
        <p>Already have an account? <span className='text-sky-700 cursor-pointer' onClick={()=>{navigate('/signup')}}>Register</span></p>
    </div>
  )
}

export default Login