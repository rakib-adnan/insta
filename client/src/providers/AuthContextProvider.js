import AuthContext from "../context/AuthContext";
import cookie from 'js-cookie';
import { useReducer } from "react";
import AuthReducer from "../reducers/AuthReducer";


    //! create state
    export const initial = { 
        token : cookie.get('token') || null,
       user : cookie.get('user') ? JSON.parse(cookie.get('user')) : null
    }
   

const AuthContextProvider = ({ children }) => { 

    const [state, dispatch] = useReducer(AuthReducer, initial );
    return (
        <AuthContext.Provider
        value={{
            token: state.token,
            user: state.user,
            dispatch
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}


//! exports
export default AuthContextProvider;