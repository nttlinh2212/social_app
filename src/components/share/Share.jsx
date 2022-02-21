import './share.css'

import React, { useContext, useRef, useState } from 'react';
import {PermMedia,Label,Room,EmojiEmotions, Cancel} from "@mui/icons-material";
import { AuthContext } from '../../context/AuthContext';
import { instance } from '../../utils';


function Share(props) {
    const {user} = useContext(AuthContext);
    const [file, setFile] = useState(null);
    //console.log(file);
    const desc = useRef();
    const shareCancelHandler = ()=>{
        setFile(null)
    }
    const postSubmitedHandler = async (e)=>{
        e.preventDefault();
        
        try {
            
            if(file){
                const filename = "post/"+Date.now() + '-' + Math.round(Math.random() * 1E9);
                await instance.post(`posts`,{
                    desc:desc.current.value,
                    img: filename
                });
                const data = new FormData();
                data.append('img',file, filename)
                //console.log(data)
                await instance.post('posts/upload',data)
            
            }else{
                await instance.post(`posts`,{
                    desc:desc.current.value
                });
            }
            window.location.reload();
            
            
        } catch (error) {
            console.log(error)
        }
        

    }
    const publicFolderLink = process.env.REACT_APP_PUBLIC_FOLDER;
    const defaultAvatar = process.env.REACT_APP_DEFAULT_AVATAR;
    return (
        <div className='share'>
            <div className="shareWrapper">
                <form onSubmit={postSubmitedHandler}>
                    <div className="shareTop">
                        <img src={user?.profilePicture?publicFolderLink+user.profilePicture:defaultAvatar} alt="profile" className='shareProfileImg' />
                        <input className="shareInput" placeholder={`What's on your mind ${user?.username}?`} ref={desc}></input>
                    </div>
                    
                    
                    {file && (
                        <div className='shareImgContainer'>
                            <div className='shareImgWrapper'>
                                <img className='shareImg' src={URL.createObjectURL(file)} alt='share'/>
                                <Cancel className='shareCancelButton' onClick={shareCancelHandler}/>
                            </div>
                            
                        </div>
                    )}
                    <hr className='shareHr'/>
                    <div className="shareBottom">
                        <div className="shareOptions">
                            <label htmlFor='file' className="shareOption">
                                <PermMedia className='shareOptionIcon' htmlColor='tomato'/>
                                <span className="shareOptionText">Photo or Video</span>
                                <input hidden={true} type='file' id='file' accept='.png,.jpeg,.jpg' onChange={(e)=>{setFile(e.target.files[0])}}/>
                            </label>
                            <div className="shareOption">
                                <Label className='shareOptionIcon' htmlColor='blue'/>
                                <span className="shareOptionText">Tag</span>
                            </div>
                            <div className="shareOption">
                                <Room className='shareOptionIcon' htmlColor='green'/>
                                <span className="shareOptionText">Location</span>
                            </div>
                            <div className="shareOption">
                                <EmojiEmotions className='shareOptionIcon' htmlColor='goldenrod'/>
                                <span className="shareOptionText">Feeling</span>
                            </div>
                        </div>
                        <button className='shareButton' type='submit'>Share</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Share;