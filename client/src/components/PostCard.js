import { useEffect, useState } from "react";
import "./PostCard.css";
import axios from 'axios';



const base_url = process.env.REACT_APP_BACKEND_URL;
const multiavatarapikey = process.env.REACT_APP_MULTIAVATAR_API_KEY;

function PostCard({data}) {    
    const dateObj = new Date(data.created_at);
    const formattedDate = dateObj.toLocaleDateString("en-GB", {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    
    const isAuth = localStorage.getItem("isAuthenticated")===null||localStorage.getItem("isAuthenticated")===false?false:true;
    const [mycomment, setMyComment] = useState('');
    const [comments, setComments] = useState([]);
    const handleChange = (e)=>{
        e.preventDefault();
        setMyComment(e.target.value);
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (mycomment!==""){
            const postdata = {
                comment: mycomment,
                post_id: data.post_id,
            }
            var config =  {headers: {
                'token': localStorage.getItem("token")
            }}
      
            await axios.post(`${base_url}/post/comment`, postdata, config);
            setComments(oldcomments=> [{
                comment: mycomment,
                username: localStorage.getItem("username"), 
                created_at: Date.now(), 
                user_id: localStorage.getItem("user_id"), 
            }, ...oldcomments]);
            setMyComment("");
        }
    }



    useEffect(()=>{
        const fetchComments = async ()=>{
            const res = await axios.get(`${base_url}/post/fetch_comment/${data.post_id}`);
            
            setComments(res.data.allcomments);
        }   
        fetchComments();
    }, [data.post_id])


    return (
            <div className="postcard_main">
                <div className="postcard_title">
                     <div className="user_section">
                            <span className="flex items-center gap-px">
                                <img className="avatar_img"
                                src={`https://api.multiavatar.com/${data.user_id}.svg?apikey=${multiavatarapikey}`} 
                                alt=""/>
                                {data.name}
                            </span>
                            <span className="postcard_title_main">{data.title}</span>
                            <span>
                                {formattedDate}
                            </span>
                        </div>
                    
                </div>
                <div className="postcard_second_sec">
                    <img  src={`${base_url}/public/posts/${data.image}`} className="postcard_img" alt=""/>
                    <div className="postcard_right">
                        <div className="postcard_content">
                            <span style={{fontWeight:"700"}}>Description: </span>
                                {data.description}
                                <br/>
                                <br/>
                                {comments.length===0?<p style={{color:"gray"}}>No Comments Yet</p>:<p style={{fontWeight:"700"}}>Comments</p>}
                                {comments.map((val, i)=>{

                                    return (
                                    <div key={i} className="comment_box">
                                        <div style={{display:"flex"}}>
                                            <img src={`https://api.multiavatar.com/${val.user_id}.svg?apikey=${multiavatarapikey}`} className="comment_box_avatar" alt=""/>
                                            <span style={{fontWeight:"500"}}>{val.username }</span>
                                        </div>
                                        <span style={{marginLeft:"10px"}}> {val.comment} </span>
                                        
                                    </div>)
                                })}
                            </div>
                     <div className="postcard_input" >
                        {isAuth?
                        <input className="postcard_actual_input" name="comment" onChange={handleChange} value={mycomment} placeholder="Add a comment ..."/>
                        :<input className="postcard_actual_input" disabled placeholder="Login to Add a comment ..."/>}
                        <button className="postcard_btn" onClick={handleSubmit}>POST </button>
                    </div>

                    </div>
                </div>
            </div>
    )
}

export default PostCard