import React from 'react';
import './rightbarHome.css';
import {Users} from '../../dummyData'
import RightbarFriend from '../rightbarFriend/RightbarFriend';


function RightbarHome(props) {
    return (
        <div>
            <div className="birthdayContainer">
                    <img src="assets/gift.png" alt="birthday picture" className='birthdayImg'/>
                    <span className="birthdayText">
                        <b>Mary Montera </b>
                        and 
                        <b> 3 other friends </b>
                        have a birthday today.
                    </span>
                </div>
                <img src="assets/ad.png" alt="ad picture" className='rightbarAd' />
                <h4 className="rightbarTitle">Online friends</h4>
                <ul className='rightbarFriendList'>
                    {Users.map(user=>(
                        <RightbarFriend key={user.id} user={user}/>
                    ))}
                    
                </ul>
        </div>
    );
}

export default RightbarHome;
