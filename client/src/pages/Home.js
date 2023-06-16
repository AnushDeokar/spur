import Layout from '../components/Layout';
import "./pages.css";
import HomeTopSection from '../components/HomeTopSection';
import PostCard from '../components/PostCard';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return ( 

    <Layout>
        <HomeTopSection/>
        <div className="head_font" style={{backgroundColor:"#efefef", padding:"150px 40px", color:"#252930"}}>
          <p>Welcome to our Virtual Art Gallery! Step into a captivating realm where artists like you can showcase their remarkable artwork. Share your masterpieces with a global audience, while exploring a diverse array of creativity from talented individuals worldwide. Immerse yourself in this vibrant community, where inspiration knows no bounds. Let art transcend boundaries!</p>
          <button className='show_btn' style={{cursor:"pointer"}} onClick={()=>{navigate("/createpost")}}>Show your Art</button>
        </div>
        <h1 className='head_font' style={{marginTop:"30px", fontSize:"50px"}}>Gallary</h1>
        <PostCard/>
        <PostCard/>
        
    </Layout>
  )
}



export default Home