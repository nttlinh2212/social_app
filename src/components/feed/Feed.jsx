import React, {  useState } from 'react';
import Share from '../share/Share';
import Post from '../post/Post';
import './feed.css'
//import {Posts} from '../../dummyData'
import { useEffect } from 'react';
import { instance } from '../../utils';
//import { AuthContext } from '../../context/AuthContext';

function Feed({username}) {
   
    const [posts, setPosts] = useState([]);
    // const {dispatch} = useContext(AuthContext)
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                //const accessToken = localStorage.socalApp_accessToken;
                
                let ret;
                if(!username)
                    ret = await instance.get('posts/timeline');
                else
                    ret = await instance.get(`posts/all/${username}`);
                if(ret.status === 200){
                    ret.data.sort((p1,p2)=>new Date(p2.createdAt)- new Date(p1.createdAt))
                    setPosts(ret.data);
                    ///console.log(posts);
                }
                //console.log(posts);
    
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        
        
    },[username])
    return (
       
        <div className='feed'>
             {/* {console.log("username",username)} */}
            <div className="feedWrapper">
                <Share/>
                {posts.map((post)=> (
                        <Post key={post._id} post={post}/>
                    )
                )}
                
                
            </div>
        </div>
    );
}

export default Feed;