import User from "../models/user.model.js";
import AppError from "../utils/apiError.js";
import AppResponse from "../utils/apiResponse.js";
import { wrapAsync } from "../utils/wrapAsync.js";

const signup = wrapAsync(async (req, res) => {
  const { fullName, username, password, confirmPassword, gender } = req.body;

  // return res.send({ fullName, password });
  if (password !== confirmPassword) {
    return res.status(400).json(new AppError(400, "Passwords don't match !!"));
  }

  const exisitingUser = await User.findOne({ username });
  if (exisitingUser) {
    return res
      .status(400)
      .json(new AppError(400, " This User name already exists!"));
  }

  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

  const newUser = await User.create({
    fullName,
    username,
    password,
    gender,
    profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
  });
  const user = await User.findById(newUser._id).select("-password");

  const token = await user.generatToken();
  return res
    .status(200)
    .cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    })
    .json(new AppResponse(201, user, "New User created successfully", true));
});

const login = wrapAsync(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res
      .status(404)
      .json(new AppError(404, "This Username does not exists", false));
  }
  const isPasswordCorrect = await user.matchPasswords(password);
  if (!user || !isPasswordCorrect) {
    return res
      .status(404)
      .json(new AppError(404, "Invalid username or password"));
  }

  const token = await user.generatToken();
  const loggedInUser = await User.findOne({ username });

  return res
    .status(200)
    .cookie("jwt", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
      secure: true,
    })
    .json(new AppResponse(200, loggedInUser, "Successfully logged In", true));
});

const logout = wrapAsync(async (req, res) => {
  return res
    .status(200)
    .clearCookie("jwt", {
      httpOnly: true,
      maxAge: 0,
      secure: true,
    })
    .json(new AppResponse(200, {}, "Logged out successfully"));
});
//39:17

export { login, signup, logout };
