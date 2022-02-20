import React from 'react';
import "./sidebar.css"
import {RssFeed,Bookmark,Group,VideoCameraBack,HelpOutline,WorkOutline,Event,School} from "@mui/icons-material";
import {Users} from "../../dummyData"
import SidebarFriend from '../sidebarFriend/SidebarFriend';

function Sidebar(props) {
    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className='sidebarListItemIcon'/>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className='sidebarListItemIcon'/>
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className='sidebarListItemIcon'/>
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <VideoCameraBack className='sidebarListItemIcon'/>
                        <span className="sidebarListItemText">Video</span>
                    </li>
                    <li className="sidebarListItem">
                        <HelpOutline className='sidebarListItemIcon'/>
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkOutline className='sidebarListItemIcon'/>
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className='sidebarListItemIcon'/>
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <School className='sidebarListItemIcon'/>
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                </ul>
                <button className='sidebarButton'>Show more</button>
                <hr className='sidebarHr'/>
                <ul className="sidebarFriendList">
                    {Users.map(user=>(
                        <SidebarFriend key={user.id} user={user}/>
                    ))}
                    
                </ul>
            </div>
            
        </div>
    );
}

export default Sidebar;

