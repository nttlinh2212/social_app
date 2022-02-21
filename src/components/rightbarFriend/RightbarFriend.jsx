import React from 'react';
import './rightbarFriend.css'

function RightbarFriend({user}) {
    const publicFolderLink = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        
            <li className="rightbarFriend">
                <div className="rightbarFriendProfileContainer">
                    <img src={publicFolderLink+user?.profilePicture} alt="profile" className='rightbarFriendProfileImg' /> 
                    <span className="rightbarFriendOnline"></span>
                    
                </div>
                <span className="rightbarFriendUsername">{user?.username}</span>
            </li>
        
    );
}

export default RightbarFriend;