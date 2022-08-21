import createError from "../controllers/errorController.js";
import Jwt  from "jsonwebtoken";

//?auth middleware
export const userMiddleware = (req, res, next) => {

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
      if(login_user.id !== req.params.id){
        return next(createError(401, "You are not authorized to access this page"));
        }
        
      if(login_user){
        req.user = login_user;
        next() 
      }
             
  } catch (error) {
      console.log(error);
      return next(createError(401, "Something Wrong"));
  }
}