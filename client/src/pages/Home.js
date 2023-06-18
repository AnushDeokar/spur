import Layout from '../components/Layout';
import "./pages.css";
import HomeTopSection from '../components/HomeTopSection';
import PostCard from '../components/PostCard';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const base_url = process.env.REACT_APP_BACKEND_URL;
function Home() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(10000);
  const loadpost = async (initial) =>{
    setIsLoading(true);
    console.log("initial", initial);
    console.log("compare", count, items.length);
    try{
      if (items.length<count){
        const res = await axios.get(`${base_url}/post/fetch?offset=${page}&length=${initial}`);
        if (res.data.success){
          setItems(prevItems => [...prevItems, ...res.data.posts]);
          setPage(prevPage => prevPage + 1);
        }
        if (initial){
            // count = res.data.count;
            setCount(Number(res.data.count));
            console.log("count", count);
        }
      }
    }catch (err){
      console.log(err);
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(()=>{
      loadpost(true);
  }, [])

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
        && items.length<count
        ) {  
        loadpost(false);
      }
    } catch (error) {
      console.log(error);
    }
  };


  
  useEffect(() => {
    if (items.length<count){
      window.addEventListener('scroll', handelInfiniteScroll);
      return () => window.removeEventListener('scroll', handelInfiniteScroll);
    }
  }, [isLoading]);

  return ( 
    
    <Layout>
      
        <HomeTopSection/>
        <div className="head_font" style={{backgroundColor:"#efefef", padding:"150px 40px", color:"#252930"}}>
          <p>Welcome to our Virtual Art Gallery! Step into a captivating realm where artists like you can showcase their remarkable artwork. Share your masterpieces with a global audience, while exploring a diverse array of creativity from talented individuals worldwide. Immerse yourself in this vibrant community, where inspiration knows no bounds. Let art transcend boundaries!</p>
          <button className='show_btn' style={{cursor:"pointer"}} onClick={()=>{navigate("/createpost")}}>Show your Art</button>
        </div>
        <h1 className='head_font' style={{marginTop:"30px", fontSize:"50px"}}>Gallary</h1>
        {items.map((data, id)=><div key={id}>
          {id!==0?<PostCard data={data} />:<span ></span>}
          {isLoading? <div>Loading....</div>:<></>}
          </div>
        )}
        <div style={{height:"40px", color:"white", width:"100%", backgroundColor:"#252930", textAlign:"center", bottom:"0"}}>
          Developed By Anush Deokar
        </div>
        
    </Layout>
  )
}



export default Home