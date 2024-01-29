import jwt, { decode } from 'jsonwebtoken';
import User from '../models/userSchema.js';



const authenticate = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, "adaudb@e241"); //secret text
      req.user = await User.findOne(decoded.email).select('-password');
      // console.log('authenticated');
      next();
    } catch (error) {
      res.status(401).json({
        message:"Not authorized, token failed"
      })
    }
  } else {
    res.status(401).json({
      message:"Not authorized, no token"
    })
   
  }
};



export { authenticate  };