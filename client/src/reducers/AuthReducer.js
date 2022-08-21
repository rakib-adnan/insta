const AuthReducer = (state, { type, payload}) => {
  
    switch (type) {
        case 'LOGIN_USER':
            return{
                token : payload.token,
                user : payload.user
            }
            case 'LOGOUT_USER':
                return{
                    token : null,
                    user : null
                }
           
    
        default:
            return state;
           
    }

}

//! export default
export default AuthReducer;