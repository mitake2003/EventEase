import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            console.log("no user found");
        }
        //console.log(user);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
       
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
    
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "something went wrong while creating tokens")
    }
};

const registerUser = AsyncHandler(async (req, res) => {
    const { fullName, username, password, email } = req.body;
    console.log(fullName, username, password, email);

    if (!fullName || !username || !password || !email) {
        throw new ApiError(400, "All fields are required !");
    }

    const existedUsername = User.findOne({ username });
    if (!existedUsername) {
        throw new ApiError(409, "Username is Already exist");
    }

    const existedEmail = User.findOne({ email });
    if (!existedEmail) {
        throw new ApiError(409, "Email is Already exist");
    }

    const user = await User.create({
        fullName,
        email,
        username,
        password,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering user");
    }

    res.status(200).json(
        new ApiResponse(200, createdUser, "User Registered successfull")
    );
});

const loginUser = AsyncHandler(async (req, res) => {
    const { identifier , password } = req.body;

    let email = "";
    let username = "";
    if (identifier.includes("@gmail.com")) {
        const email = identifier;
    }
    else {
        username = identifier;
    }

    if (!username && !email) {
        throw new ApiError(400, "username or email is required ");
    }
    if (!password) {
        throw new ApiError(400, "password is required");
    }

    const user = await User.find({
        $or: [{ email }, { username }],
    });

    if (!user) {
        throw new ApiError(404, "user not found");
    }

    const isPasswordValid = await user[0].validatePassword(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Credentials");
    }
    // console.log(user[0]._id);
    // console.log(user._id);

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user[0]._id);

    const loggedUser = await User.findById(user[0]._id).select("-password -refreshToken");
    //console.log(loggedUser);

    const options = {
        httpOnly: true,
        secure: true,
    };

    res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedUser },
                "User Logged in successfully"
            )
        );
});

const logoutUser = AsyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        { refreshToken: "" },
        {
            new: true,
        }
    );

    res.status(200).json(new ApiResponse(200, {}, "User Logged Out"));
});

const getUsers = AsyncHandler(async (req, res) => {
    const users = await User.find({});

    res.status(200).json(new ApiResponse(200, users, "List of Users"));
});

export { registerUser, loginUser, logoutUser, getUsers };
