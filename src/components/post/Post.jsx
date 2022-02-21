import React, { useEffect, useState } from 'react';
import './post.css'
import {MoreVert} from "@mui/icons-material";
import { instance } from '../../utils';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { Snackbar } from '@mui/material';


function Post({post}) {
    const publicFolderLink = process.env.REACT_APP_PUBLIC_FOLDER;
    const defaultAvatar = process.env.REACT_APP_DEFAULT_AVATAR;
    const [open,setOpen] = useState(false);
    const [message,setMessage] = useState("");
    const [like,setLike]= useState(post.likes.length);
    
    const [isLike,setIsLike]= useState(post.likes.includes(localStorage.socialApp_userId));
   
    const likeIconHandler = async ()=>{
        setLike(isLike?like-1:like+1);
        setIsLike(!isLike);
        try {
            const ret = await instance.post(`posts/${post._id}/like`);
            if(ret.status === 200){
                setMessage(ret.data.message);
                setOpen(true)
            }
        } catch (error) {
            if(error.response){
                setMessage(error.response.data.message);
                setOpen(true)
            }
            else{
                console.log("Error: ",error)
            }
        }
    }
    // useEffect(()=>{
        
    // },[setIsLike])
    const [user,setUser] = useState({}); 
    useEffect(()=>{
        const fetchData = async() =>{
            try {
                const ret = await instance.get(`users/${post.userId}`);
                if(ret.status===200){
                    setUser(ret.data)
                }
            } catch (error) {
                console.log(error)
            }
            
        }
        fetchData();
    },[post.userId,setUser])
    return (
        
        <div className='post'>
            {console.log(typeof(post)+"post")}
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img src={user.profilePicture?publicFolderLink+user.profilePicture:defaultAvatar} alt="profile picture" className='postProfileImg'/>
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert/>
                    </div> 
                </div>
                <div className="postCenter">
                    <span className="postContent">{post.desc}</span>
                    {post.img && <img src={publicFolderLink+post.img} alt="post picture" className='postImg' />     }             
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src={publicFolderLink+"like.png"} alt="like icon" className='likeIcon' onClick={likeIconHandler}/>
                        <img src={publicFolderLink+"heart.png"} alt="hear icon" className='heartIcon' onClick={likeIconHandler}/>
                        <span className="postLikeCounter">{like} people liked it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>

                    </div>
                    <Snackbar
                        open={open}
                        autoHideDuration={2000}
                        message={message}
                        onClose={()=>setOpen(false)}
                    />
                </div>
            </div>
        </div>
    );
}

export default Post;