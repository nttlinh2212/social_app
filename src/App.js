import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";



function App() {
  
  return (
   <Routes>
     
      <Route path ='/' element={<RequireAuth><Home/></RequireAuth>}/>
     
     

     <Route path = '/register' element={<Register/>}/>
     <Route path = '/login' element={<Login/>}/>
     
      <Route path = '/profile/:username' element={<RequireAuth><Profile/></RequireAuth>}/>
     
     
     
     
   </Routes>
  );
}
const RequireAuth = ({children})=>{
  const location = useLocation();
  if(!localStorage.socialApp_accessToken){
    
    return (<Navigate to={'/login'} state={{from:location}} />)
    
  }
  return children;
}
export default App;
