import Layout from '../components/Layout';
import "./pages.css";
import HomeTopSection from '../components/HomeTopSection';
import PostCard from '../components/PostCard';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const base_url = process.env.REACT_APP_BACKEND_URL;
function Home() {
  // var postfetched = 0;
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const loadpost = async () =>{
    setIsLoading(true);
    try{
      const res = await axios.get(`${base_url}/createpost/fetch?offset=${page}`);
      setItems(prevItems => [...prevItems, ...res.data.msg]);
      setPage(prevPage => prevPage + 1);
    }catch (err){
      console.log(err);
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(()=>{
      loadpost();
  }, [])

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        
        loadpost();
        console.log("Hit");
      }
    } catch (error) {
      console.log(error);
    }
  };


  
  useEffect(() => {
    window.addEventListener('scroll', handelInfiniteScroll);
    return () => window.removeEventListener('scroll', handelInfiniteScroll);
  }, [isLoading]);

  return ( 
    
    <Layout>
      
        <HomeTopSection/>
        <div className="head_font" style={{backgroundColor:"#efefef", padding:"150px 40px", color:"#252930"}}>
          <p>Welcome to our Virtual Art Gallery! Step into a captivating realm where artists like you can showcase their remarkable artwork. Share your masterpieces with a global audience, while exploring a diverse array of creativity from talented individuals worldwide. Immerse yourself in this vibrant community, where inspiration knows no bounds. Let art transcend boundaries!</p>
          <button className='show_btn' style={{cursor:"pointer"}} onClick={()=>{navigate("/createpost")}}>Show your Art</button>
        </div>
        <h1 className='head_font' style={{marginTop:"30px", fontSize:"50px"}}>Gallary</h1>
        {items.map((val, id)=><>
          {console.log(val)}
          <PostCard key={id}/>
          {isLoading? <div>Loading.....</div>:<></>}</>
        )}

        
    </Layout>
  )
}



export default Home