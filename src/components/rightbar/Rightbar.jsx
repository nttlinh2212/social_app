import React from 'react';
import RightbarHome from '../rightbarHome/RightbarHome';
import RightbarProfile from '../rightbarProfile/RightbarProfile';
import './rightbar.css';




function Rightbar({user}) {
     
    
    return (
        <div className='rightbar'>
            <div className="rightbarWrapper">
                
                {user?<RightbarProfile user={user}/>:<RightbarHome/>}
            </div>
            
        </div>
    );
}

export default Rightbar;