import { createContext, useReducer } from "react";
import AuthReducer, { initialState } from "./AuthReducer";

const defaultValue = {}
export const AuthContext = createContext(defaultValue);


export const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(AuthReducer,initialState);
    return (
        <AuthContext.Provider value={{user:state.user,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

