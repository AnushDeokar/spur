import React, { useState } from 'react'
import "../App.css"
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const back_url = process.env.REACT_APP_BACKEND_URL;
function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState({
        iserror:false,
        msg:""
    })

    const [details, setDetails] = useState({
        name:"",
        username:"",
        password:"",
        confirm_password:""
    });

    const handleChange = (e)=>{
        e.preventDefault();
        setDetails({...details, [e.target.name]:e.target.value});
        console.log(details);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (details.username===""||details.name===""||details.password===""||details.confirm_password){
            setError({iserror:true, msg:"Please fill all the fields"});
        }else if (details.username.length<=5){
            console.log(details.username)
            setError({iserror:true, msg:"Username should be atleast 5 characters long"});
        }else if(details.password.length<=5){
            setError({iserror:true, msg:"Password should be atleast 5 characters long"});
        }else if(details.password !== details.confirm_password){
            setError({iserror:true, msg:"Passwords do Not Match"});
        }else{
            try{
                const res = await axios.post(`${back_url}/auth/signup`, {name:details.name, username: details.username, password: details.password})
                if (!res.data.success){
                    setError({iserror:true, msg:res.data.msg});
                }else{
                    navigate("/login");
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
            <h2 style={{color:"white"}}>Signup</h2>
            <div className='flex-column'>
            <input type="text"placeholder='Name' name="name" onChange={handleChange} value={details.name} className='auth_input'/>
            <input type="text"placeholder='Set any username' name="username" onChange={handleChange} value={details.username} className='auth_input'/>
            <input type="password" placeholder='Password' name="password" onChange={handleChange} value={details.password} className='auth_input'/>
            <input type="password" placeholder='Confirm Password' name="confirm_password" onChange={handleChange} value={details.confirm_password} className='auth_input'/>
            <button className='auth_btn' onClick={handleSubmit}>Signup</button>
            </div>
        </div>
        <p>Already have an account? <span className='text-sky-700 cursor-pointer' onClick={()=>{navigate('/login')}}>Login</span></p>
    </div>
  )
}

export default Signup