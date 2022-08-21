
import { useContext } from "react";
import { Navigate} from "react-router-dom";
import AuthContext from "../context/AuthContext";

//? create authenticate
const AuthRedirectUser = ({children}) => {

    const {token } = useContext(AuthContext);
    return token ? <Navigate to="/"/> : children;

}

//! exports default
export default AuthRedirectUser;