import React, { useContext, useEffect } from 'react';
import './topbar.css'
import {Person, Search, Chat, Notifications} from "@mui/icons-material";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { instance } from '../../utils';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

function Topbar(props) {

    const {user, dispatch} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                
                const ret = await instance.get(`users/${localStorage.socialApp_userId}`);
                if(ret.status===200){
                  
                    dispatch({
                      type:"LOGIN",
                      payload:{
                        user: ret.data
                      }
                    })
                }
            } catch (error) {
                console.log(error);
            }
            
        };
        //console.log("APP");
        if(!localStorage.socialApp_accessToken){
            navigate('/login')
        }
        console.log("accesstoken",localStorage.socialApp_accessToken)
        !user&&fetchData()
    },[dispatch,navigate,user])
    const logoutButtonHandler = ()=>{
        localStorage.removeItem('socialApp_accessToken');
        navigate('/login')
    }
    const publicFolderLink = process.env.REACT_APP_PUBLIC_FOLDER;
    const defaultAvatar = process.env.REACT_APP_DEFAULT_AVATAR;
    return (
        <div className="topbarContainer">
            {console.log("USER CONTEXT FROM TOPBAR:",user)}
            <div className="topbarLeft">
                <Link to={'/'} style={{textDecoration: "none"}}>
                    <span className="logo">
                        SocialApp
                    </span>
                </Link>
                
            </div>
            <div className="topbarCenter">
                <div className="searchBar">
                    <Search className='searchIcon'/>
                    <input type="text" placeholder="Search for friend, post, video" className="searchInput"/>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <div className="topbarLink">Homepage</div>
                    <div className="topbarLink">Timeline</div>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat/>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications/>
                        <span className="topbarIconBadge">1</span>
                    </div>

                </div>
                <Link to={`/profile/${user?.username}`} style={{textDecoration: "none"}} className='topbarLinks'>
                    <img src={user?.profilePicture?publicFolderLink+user.profilePicture:defaultAvatar} alt="profile picture" className='topbarImg'/>
                    <span className='txtUsername'>{user?.username}</span>
                </Link>
                
                <ExitToAppOutlinedIcon className='logoutButton' onClick={logoutButtonHandler} />
            </div>

        </div>
    );
}

export default Topbar;