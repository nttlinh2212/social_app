import React from 'react';
import './rightbarProfile.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { instance } from '../../utils';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Remove } from '@mui/icons-material';

const publicFolderLink = process.env.REACT_APP_PUBLIC_FOLDER;
const defaultAvatar = process.env.REACT_APP_DEFAULT_AVATAR;



function RightbarProfile(props) {
    const {user,dispatch} = useContext(AuthContext);
    //console.log("USER AUTHCONTEXT",user)
    const [followings, setFollowings] = useState([]);
    const [isFollow, setIsFollow] = useState(false)
    useEffect(()=>{
        setIsFollow(user?.followings.includes(props.user?._id));
    },[user?.followings,props.user._id])
    const followHandler = async (e)=>{
        try {
            console.log(isFollow)
            if(isFollow){
                const ret = await instance.patch(`users/unfollow`,{
                    "otherUser": props.user?._id
                });
                if(ret.status === 204){
                    
                    //setIsFollow(false);
                    dispatch({
                        type:"UNFOLLOW",
                        payload:{
                            userId:props.user?._id
                        }
                    })

                    ///console.log(posts);
                }
            }else{
                const ret = await instance.patch(`users/follow`,{
                    "followedUser": props.user?._id
                });
                if(ret.status === 204){
                    
                    //setIsFollow(true);
                    dispatch({
                        type:"FOLLOW",
                        payload:{
                            userId:props.user?._id
                        }
                    })
                    ///console.log(posts);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                //console.log("User",user, user._id)
                
                const ret = await instance.get(`users/${props.user._id}/friends`);
                if(ret.status === 200){
                    
                    setFollowings(ret.data);
                    ///console.log(posts);
                }
                    //console.log(posts);
    
                
                
            } catch (error) {
                console.log(error);
            }
        }
        if(props.user?._id) fetchData();////typeof(props.user), JSON.stringify(props.user)
    },[props.user?._id])
    return(
        <>
            {console.log("PROPS>USER",typeof(props.user), (props.user))}
            {/* <button type='button' className='followButton'>Follow</button><hr/> */}
            {props.user?._id!==user?._id && <Button variant="contained" className='followButon' onClick={followHandler} endIcon={isFollow?<PersonAddAltIcon />:<Remove/>}>{isFollow?"Unfollow":"Follow"} </Button>}
            <div className="rightbarUserInfo">
                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarUserInfoItem">
                    <span className="rightbarUserInfoKey">City:</span>
                    <span className="rightbarUserInfoValue">{props.user.city}</span>
                </div>
                <div className="rightbarUserInfoItem">
                    <span className="rightbarUserInfoKey">From:</span>
                    <span className="rightbarUserInfoValue">{props.user.from}</span>
                </div>
                <div className="rightbarUserInfoItem">
                    <span className="rightbarUserInfoKey">Relationship:</span>
                    <span className="rightbarUserInfoValue">{props.user.relationship===1?"Single":props.user.relationship===2?"Married":"Other"}</span>
                </div>
            </div>
            <div className="rightbarFollowing">
                <h4 className="rightbarTitle">Following Users</h4>
                <div className="rightbarFollowings">
                    {followings.map((user)=>{
                        return (
                            <Link to={`/profile/${user.username}`} style={{textDecoration:'none'}} key={user._id}>
                                <div className="rightbarFollowingItem">
                                <img src={user.profilePicture?publicFolderLink+user.profilePicture:defaultAvatar} alt="profile picture" className='rightbarFollowingImg'/>
                                <span className="rightbarFollowingUsername">{user.username}</span>
                                </div>
                            </Link>
                            
                        )
                    })}
                    
                
                </div>
                
                
            </div>
        </>
    )
}

export default RightbarProfile;
