import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION as string;

// Middleware for authenticating user
const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
      return res.status(401).json({
        success: false,
        status: 401, message: 'Unauthorized: No token provided'
      });
    }
    const token = authorizationHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    const user = await User.findById(decodedToken.userId);


    if (!user) {
      return res.status(404).json({
        success: false,
        status: 400, message: 'User not found'
      });
    }
    const checkToken = await User.findOne({ _id: user._id })
    if (checkToken?.jwtToken) {
      if (checkToken.jwtToken == token) {
        req.user = user as IUser;
        next();
      } else {
        return res.status(401).json({
          success: false,
          status: 401, message: 'Unauthorized: Invalid token'
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        status: 401, message: 'Unauthorized: Invalid token'
      });
    }

  } catch (error) {
    return res.status(401).json({
      success: false,
      status: 401, message: 'Unauthorized: Invalid token'
    });
  }
};

export { authenticateUser };
