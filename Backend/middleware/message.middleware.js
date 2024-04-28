import jwt from "jsonwebtoken";
import AppError from "../utils/apiError.js";
import User from "../models/user.model.js";

export const protectThisRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(400)
        .json(new AppError(400, "No token no Authorization"));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json(new AppError(400, "Invalid token"));
    }
    const user = await User.findById(decoded._id).select("-password");
    req.user = user;
    next();
  } catch (error) {
    console.log("ERROR in Protect this Route: ", error);
    return res.status(500).json(new AppError(500, "Internal server error"));
  }
};
