const AuthReducer = (state, { type, payload}) => {
  
    switch (type) {
        case 'LOGIN_USER_SUCCESS':
            return{
                isUserLoggedIn : true,
                user : payload
            }
            case 'LOGOUT_USER':
                return{
                    isUserLoggedIn : false,
                    user : { }
                }
           
    
        default:
            return state;
           
    }

}

//! export default
export default AuthReducer;