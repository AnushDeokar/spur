import React, { useState, useEffect } from 'react'
import "../App.css";

const displaystate = [
    {
        src:"./demo1.jpg",
        quote:"\"Every artist dips his brush in his own soul, and paints his own nature into his pictures.\"  - Henry Ward Beecher",
        head:"Unleash your Artistic Expression"
    },
    {
        src:"./demo4.jpg",
        quote:"\"The purpose of art is washing the dust of daily life off our souls.\"  - Pablo Picasso",
        head:"Let the World See it"
    },
    {
      src:"./demo5.jpg",
      quote:"\"Art is not what you see, but what you make others see.\" - Edgar Degas",
      head:"Step into a captivating realm"
    }
]

function HomeTopSection() {
    const [state, setState] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
          setState((state+1)%displaystate.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [state]);

  return (
    <div className='bigdiv flex-column flex-center' >
        <img className="home_main_img" src={displaystate[state].src} alt=""/>
        <div className=' m-auto text-center main_home_title' style={state===0?{animation:"fadeIn 3s"}:{animation:"fadeOut 3s"}}><p className='quote'>{displaystate[state].quote}</p>{displaystate[state].head}</div>
    </div>
  )
}

export default HomeTopSection;