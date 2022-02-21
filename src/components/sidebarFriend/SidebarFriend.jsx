import React from 'react';
import './sidebarFriend.css'

function SidebarFriend({user}) {
    const publicFolderLink = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="sidebarFriend">
            <img src={publicFolderLink+user?.profilePicture} alt="profile" className='sidebarFriendImg'/>
            <span className="sidebarFriendName">{user.username}</span>

        </li>
    );
}

export default SidebarFriend;