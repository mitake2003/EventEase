import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const jwtVerify = AsyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        
        if (!token) {
            throw new ApiError(401, "Unautherized request");
        }
    
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const user = await User.findById(decodeToken.id).select("-password -refreshToken");
        
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }
        
        req.user = user;
        next()
    } 
    catch (error) {
        throw new ApiError(400, error?.message || "Invalid access token")
    }
});

export { jwtVerify };