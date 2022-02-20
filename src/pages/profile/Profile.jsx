import React, { useEffect, useState,  } from 'react';
import './profile.css'
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from "../../components/topbar/Topbar";
import { useParams, useNavigate} from 'react-router-dom';
import { instance } from '../../utils';

function Profile(props) {
    const publicFolderLink = process.env.REACT_APP_PUBLIC_FOLDER;
    const defaultAvatar = process.env.REACT_APP_DEFAULT_AVATAR;
    const defaultCover = process.env.REACT_APP_DEFAULT_COVER;
    const navigate = useNavigate();
    const username = useParams().username;
    const [user,setUser] = useState({});
    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const ret = await instance.get(`users/find?username=${username}`);
                if(ret.status===200){
                    //console.log("UU",ret.data)
                    setUser(ret.data)
                }
            } catch (error) {
                console.log(error);
            }
            
        };
        if(!localStorage.socialApp_accessToken){
            navigate('/login')
        }
        fetchData()
    },[username,setUser,navigate])
    return (
        <>
            <Topbar/>
            <div className="profile">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={user.coverPicture?publicFolderLink+user.coverPicture:defaultCover} alt="" className='profileCoverImg'/>
                            <img src={user.profilePicture?publicFolderLink+user.profilePicture:defaultAvatar} alt="" className='profileUserImg'/>
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileRightTopUsername'>{user.username}</h4>
                            <span className='profileRightTopDesc'>{user.desc}</span>
                        </div>
                        
        
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/>
                        <Rightbar user={user}/>
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default Profile;