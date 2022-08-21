import createError from "../controllers/errorController.js";
import Jwt  from "jsonwebtoken";

//?auth middleware
export const adminMiddleware = (req, res, next) => {

  try {
      //todo check if token is valid
      const token = req.cookies.access_token;
      if(!token){
          return next(createError(401, "Please login"));       
      }

      //todo check if token is valid
      const login_user = Jwt.verify(token, process.env.JWT_SECRET);

      if(!login_user){
            return next(createError(401, "Invalide Token"));
      }
      if(!login_user.isAdmin){
        return next(createError(401, "You are not a Admin "));
        
        }
        
      if(login_user){
        req.user = login_user;
        next() 
      }
             
  } catch (error) {
     
      return next(error);
  }
}