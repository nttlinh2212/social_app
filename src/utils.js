import axios from "axios";


export const instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 5000
  });
  //console.log("axios",instance);
  instance.interceptors.request.use(function (config) {
    //console.log("CONFIG",config)
    if(localStorage.socialApp_accessToken) 
      config.headers['x-access-token'] = localStorage.socialApp_accessToken;
    //console.log(config)
    return config;
  }, function (error) {
    // Do something with request error
    
    return Promise.reject(error);
  });


  // export const createInstance = (dispatch) =>{
  //   console.log("here interceptors")
    
  //   return instance;
  // }
  instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalRequest = error.config;
    //console.log("in response CONFIG",error.config)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await refreshAccessToken();            
      axios.defaults.headers['x-access-token'] = access_token;
      return instance(originalRequest);
    }
    if (originalRequest._refresh && error.response.status === 400 ) {
      // const navigate = useNavigate();
      // navigate('/login');
      //console.log('wrong access token')
      localStorage.removeItem('socialApp_accessToken');
      window.location.assign('/login')
      return Promise.reject(error);
    }
    
    return Promise.reject(error);
  });

  const refreshAccessToken = async ()=>{
    const ret = await instance.post('/auth/refresh',{
      accessToken: localStorage.socialApp_accessToken,
      refreshToken: localStorage.socialApp_refreshToken
    },{_refresh:true})
  
    if(ret.status === 200){
      localStorage.socialApp_accessToken = ret.data.accessToken
      return ret.data.accessToken;
    }

  }