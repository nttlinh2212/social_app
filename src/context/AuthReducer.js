

export const initialState = {
    user:null
} 
const AuthReducer = (state, {type,payload})=>{
    switch(type){
        case "LOGIN":
            return {
                ...state,
                user:payload.user
            }
        case "LOGOUT":
            return {
                ...state,
                user:null
            }
        case "FOLLOW":
            return {
                ...state,
                user:{
                    ...state.user,
                    followings:[...state.user.followings,payload.userId]
                }
            }
        case "UNFOLLOW":
            return {
                ...state,
                user:{
                    ...state.user,
                    followings:state.user.followings.filter(followId=>followId!==payload.userId)
                }
            }
        default:
            return state
    }

}
export default AuthReducer