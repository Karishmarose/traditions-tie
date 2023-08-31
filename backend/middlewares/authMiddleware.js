import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

//used as a middleware to check if the user is authenticated or not by the Bearer token send by the user
export const authMiddleware = async (req, res, next) => {
  try {
    let token;
    //take the bearer token from API header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      //get token from header
      token = req.headers.authorization.split(" ")[1];
      //get user id from token
      const decoded = jwt.verify(token, config.JWT_SECRET);
      //get user from id
      req.user = decoded;
      //call next
      next();
    } else {
      res.status(401).json({ message: "Not authorized, no token found" });
    }
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
