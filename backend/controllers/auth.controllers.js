import cloudinaryImageUpload from "../config/cloudinary.js";
import generateToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, userName, password } = req.body;

    if (!firstName || !lastName || !email || !userName || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }
    let profileImage;
    if (req.file) {
      profileImage = await cloudinaryImageUpload(req.file.path);
    }
    console.log(req.file);

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).send({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      userName,
      password: hashedPassword,
      profileImage,
    });

    let token;

    try {
      token = generateToken(user._id);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT == "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).send({
      message: "User created successfully",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userName: user.userName,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const existUser = await User.findOne({ email });

    if (!existUser) {
      return res.status(400).send({ message: "User NOt found" });
    }

    const matchPassword = await bcrypt.compare(password, existUser.password);

    if (!matchPassword) {
      return res.status(400).send({ message: "Incorrect password" });
    }

    let token;
    try {
      token = generateToken(existUser._id);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT == "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).send({
      message: "User login successfully",
      user: {
        firstName: existUser.firstName,
        lastName: existUser.lastName,
        email: existUser.email,
        userName: existUser.userName,
        profileImage: existUser.profileImage,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
export const home = async (req, res) => {
  res.send("hello");
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT == "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "User logout successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserData = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).send({ message: "User not authenticated" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({ user });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
