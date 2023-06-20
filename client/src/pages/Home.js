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
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(10000);
  var renderIds = [];
  var called = 0;
  const loadpost = async (initial) =>{
    setIsLoading(true);
    try{
      if (items.length<count){
        const res = await axios.get(`${base_url}/post/fetch?offset=${page}&length=${initial}`);
        if (res.data.success){
          setItems(prevItems => [...prevItems, ...res.data.posts]);
          setPage(prevPage => prevPage + 1);
        }
        if (initial){
            setCount(Number(res.data.count));
        }
      }
    }catch (err){
      console.log(err);
    }finally{
      setIsLoading(false);
    }
  }
  
  const renderData = (data) => {
    if (renderIds.includes(data.post_id)) {
      return null;
    }
    renderIds.push(data.post_id);

    // Render the data
    return (
        <PostCard data={data} key={data.post_id}/>
    );
  };

  useEffect(()=>{
    window.scrollTo(0, 0);
      if (called===0){
        loadpost(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        called = called+1;
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (items.length<count){
      // eslint-disable-next-line react-hooks/exhaustive-deps
      window.addEventListener('scroll', handelInfiniteScroll);
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {items.map((data)=>
          renderData(data)
        )}
        {isLoading? <div className='text-center w-full'>Loading....</div>:<></>}
        <div style={{height:"40px", color:"white", width:"100%", backgroundColor:"#252930", textAlign:"center", bottom:"0"}}>
          Developed By Anush Deokar | 2023
        </div>
    </Layout>
  )
}



export default Home