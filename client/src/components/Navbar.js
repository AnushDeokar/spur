import React from 'react'
import "../App.css"
import { useState, useEffect } from 'react'
import {RxHamburgerMenu} from "react-icons/rx";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const base_url = process.env.REACT_APP_BACKEND_URL
function Navbar() {
    const navigate = useNavigate();
    const [header, setHeader] = useState("header")
    const [show, setShow] = useState(false);
    const isAuthenticated = localStorage.getItem("isAuthenticated")===null||localStorage.getItem("isAuthenticated")===false?false:true;
    const [isloggedin, setIsloggedin] = useState(isAuthenticated);
    
    const listenScrollEvent = (event) => {
        if (window.scrollY < 100) {
            return setHeader("header")
        } else if (window.scrollY > 105) {
            return setHeader("header2")
        } 
    }

    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent);
    
        return () =>
        window.removeEventListener('scroll', listenScrollEvent);
    }, []);

    const handlelogout = async()=>{
        await axios.get(`${base_url}/auth/logout`, { withCredentials: true });
        setIsloggedin(false);
        localStorage.removeItem("isAuthenticated");
    }
  return (
    <div className='w-full red navbar_main flex justify-between' style={header==="header"?{backgroundColor:"transparent", borderBottom:"1px solid white"}: {backgroundColor:"#252930"}}>
        <div className="gallary_name"><span className='nav_span'> VirtuArtGalerie</span></div>
        <div className="gallary_name nav_laptopview">
            <span className='nav_span mx-0.5'> Welcome, Anush</span> 
            <span className='nav_span mx-0.5' style={{cursor:"pointer"}} onClick={()=>{navigate("/createpost")}}> Post</span>
            {isloggedin?<span className='nav_span mx-0.5' onClick={handlelogout} style={{cursor:"pointer"}}> Logout</span>:<span className='nav_span mx-0.5' style={{cursor:"pointer"}} onClick={()=>{navigate("/login")}}> Login</span>}
            
        </div>
        <div className="nav_mobileview" >
            <span className='nav_span mx-0.5'> <RxHamburgerMenu size={30} onClick={()=>{setShow(!show)}}/></span> 
            {show?
            <div className='nav_dropdown' style={header==="header"?{backgroundColor:"transparent", border:"1px solid white"}: {backgroundColor:"#252930"}}>
                <span className='nav_span_1' style={{borderBottom:"1px solid white"}}> Welcome, Anush</span> 
                <span className='nav_span_1' style={{cursor:"pointer", borderBottom:"1px solid white"}} onClick={()=>{navigate("/createpost")}}> Post</span>
                {isloggedin?<span className='nav_span_1' onClick={handlelogout}  style={{cursor:"pointer"}}> Logout</span>:<span className='nav_span_1' style={{cursor:"pointer"}} onClick={()=>{navigate("/login")}}> Login</span>}
            </div>
            :<></>}
        </div>
    </div>
  )
}

export default Navbar