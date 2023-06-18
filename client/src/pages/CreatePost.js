import React, { useState } from 'react'
import Layout from "../components/Layout";
import {AiOutlineUpload} from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const base_url = process.env.REACT_APP_BACKEND_URL;
function CreatePost() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    title:"",
    description:""
  })
  const [postimg, setPostImg] = useState(null);

  const handleChange = (e)=>{
    e.preventDefault();
    setDetails({...details, [e.target.name]:e.target.value});
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    if (details.title!=="" && details.description!=="" && postimg!=null){
        var formdata = new FormData();
        formdata.append("title", details.title);
        formdata.append("description", details.description);
        formdata.append("image", postimg);
        var config =  {headers: {
          'Content-Type': 'multipart/form-data',
          'token': localStorage.getItem("token")
        }}

        const res = await axios.post(`${base_url}/post/upload`, formdata, config);
        if (res.data.success){    
            navigate("/")
        }
    }

  }
  return (
    <Layout>
      <div style={{backgroundColor:"#252930", height:"65px"}}>
      </div>
      <div style={{textAlign:"center"}}>
        <h1 className="create_post_head">Unveil your Artistic Talent</h1>
        <div className='createpost_form'>
            <div style={{width:"100%", textAlign:"left"}}>
              <label className='createpost_label'>Title*</label>
              <input type="text" className='createpost_title' onChange={handleChange} name='title' value={details.title}/>
            </div>
            <div style={{width:"100%", textAlign:"left"}}>
              <label className='createpost_label'>Description*</label>
              <textarea id="freeform" name="description" value={details.description} onChange={handleChange} className="createpost_description" rows="4" cols="50"></textarea>
            </div>
            <div style={{width:"100%", textAlign:"left"}} >
              <label className='createpost_label'>Upload Image*</label>
              <div className='createpost_img'>
                <AiOutlineUpload style={{margin:"auto"}} size={40}/> <input type='file' onChange={(event)=>{setPostImg(event.target.files[0]);}} accept="image/*"/>
              </div>
            </div>

            <button className='createpost_submit' onClick={handleSubmit}>Post</button>
        </div>
      </div>
    </Layout>
  )
}

export default CreatePost