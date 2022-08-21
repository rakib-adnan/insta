
import { useContext } from "react";
import { Navigate} from "react-router-dom";
import AuthContext from "../context/AuthContext";

//? create authenticate
const AuthenticateUser = ({children}) => {

    const {token } = useContext(AuthContext);
    return token ? children : <Navigate to="/login"/>

}

//! exports default
export default AuthenticateUser;