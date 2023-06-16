import "./PostCard.css";

function PostCard() {
    const avatars = ["https://api.multiavatar.com/stefan.svg", "https://api.multiavatar.com/kathrin.svg", "https://api.multiavatar.com/Starcrasher.svg"]

    return (
            <div className="postcard_main">
                <div className="postcard_title">
                     <div className="user_section">
                            <span className="flex items-center gap-px">
                                <img className="avatar_img" src={avatars[0]} alt=""/>
                                Anush Deokar
                            </span>
                            <span className="postcard_title_main">A Magical Paradise</span>
                            <span>
                                23rd March 2023
                            </span>
                        </div>
                    
                </div>
                <div className="postcard_second_sec">
                    <img  src="./demo1.jpg" className="postcard_img" alt=""/>
                    <div className="postcard_right">
                        <div className="postcard_content">
                            <span style={{fontWeight:"700"}}>Description: </span>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis quibusdam, vel ab numquam facilis veritatis tenetur dignissimos quidem enim omnis? Obcaecati et repudiandae voluptas vitae molestiae, adipisci facere minima ratione.
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis tempora temporibus officia asperiores? Harum eligendi numquam molestias laboriosam quibusdam voluptatum, cumque facere illum nemo dolore, iusto obcaecati unde debitis veniam?
                     </div>
                     <div className="postcard_input" >
                        <input className="postcard_actual_input" placeholder="Add a comment ..."/>
                        <button className="postcard_btn">POST</button>
                    </div>

                    </div>
                </div>
            </div>
    )
}

export default PostCard