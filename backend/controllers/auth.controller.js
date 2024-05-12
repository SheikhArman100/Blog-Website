import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";

//handle signup
export const handleSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Invalid or incomplete user data",
      });
    }

    //? check is email or username already exist in database
    const existedUser = await User.findOne({
      email: email,
    });
    if (existedUser) {
      return res.status(409).json({
        message: "Email is already registered",
      });
    }

    try {
      //encrypt password
      const hashPassword = await bcrypt.hash(password, 10);

      //create user in database
      const newUser = new User({
        name,
        email,
        password: hashPassword,
      });
      await newUser.save();
      return res.status(201).json({
        message: "New account is created successfully",
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        message: "registration failed",
        error: error.massage,
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

//handle signIn
export const handleSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid or incomplete user data",
      });
    }

    //?find the user in db using email
    const findUser = await User.findOne({
      email: email,
    });
    if (!findUser)
      return res.status(401).json({
        message: "Email or Password doesn't match with any account",
      }); //Unauthorized

    //? evaluate and compare password
    const matchPassword = await bcrypt.compare(password, findUser.password);
    if (!matchPassword) {
      return res.status(401).json({
        message: "Email or Password doesn't match with any account",
      }); //Unauthorized
    }

    //?creating accessToken and refreshToken
    const accessToken = jwt.sign(
      {
        id: findUser.id,
        email: findUser.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "300s" } //5min
    );
    const refreshToken = jwt.sign(
      {
        id: findUser.id,
        email: findUser.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "18000s" } //50min
    );

    //?Update the user in the database with the refresh token.
    await User.findByIdAndUpdate(findUser.id, {
      refreshToken: refreshToken,
    });

    //? Creates Secure Cookie with refresh token
    res.cookie("BlogJwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 50 * 60 * 1000,
    });

    //? return accessToken in res
    return res.status(200).json({
      accessToken: accessToken,
      message: "Logged in  successfully",
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: "Something went wrong ",
      error: error.message,
    });
  }
};

//signout
export const handleSignOut = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.BlogJwt)
      return res.status(401).json({
        message: "No refresh token found",
      });
    const refreshToken = cookies.BlogJwt;

    //?Is refreshToken in db?
    const findUser = await User.findOne({
      refreshToken: refreshToken,
    });
    //? if refreshToken found in cookies but not in database.Could be hacker leaked a rt from cookie
    if (!findUser) {
      res.clearCookie("BlogJwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.status(403).json({
        message: "Not Authorized",
      });
    }

    //?remove refresh token from db and delete it from cookie
    await User.findOneAndUpdate(
      { refreshToken: refreshToken },
      { refreshToken: "" }
    );
    res.clearCookie("BlogJwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    return res.status(200).json({
      message: "Signed out successfully",
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: "Something went wrong ",
      error: error.message,
    });
  }
};

//update accessToken
export const handleUpdateAccessToken=async(req,res)=>{
  try {
    const cookies = req.cookies;
    if (!cookies?.BlogJwt)
      return res.status(401).json({
        message: "No refresh token found",
      });
    const refreshToken = cookies.BlogJwt;
  
    //?Is refreshToken in db?
    const findUser = await User.findOne({
      refreshToken: refreshToken,
    });
    //? if refreshToken found in cookies but not in database.Could be hacker leaked a rt from cookie
    if (!findUser) {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }
    //?verify jwt
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || findUser.id !== decoded.id)
        return res.status(403).json({
          message: "Invalid refresh token",
        });
      const accessToken = jwt.sign(
        {
          id: decoded.id,
          email: decoded.email,
          
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "300s" }
      );
      return res.status(200).json({
        accessToken: accessToken,
        message: "Access token updated successfully",
      });
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: "Something went wrong ",
      error: error.message,
    });
  }
}

export const handleUserInfo=async(req,res)=>{
  try {
    const cookies = req.cookies;
    if (!cookies?.BlogJwt)
      return res.status(401).json({
        message: "No refresh token found",
      });
    const refreshToken = cookies.BlogJwt;


    //?Is refreshToken in db?
    const findUser = await User.findOne({
      refreshToken: refreshToken,
    });


    //? if refreshToken found in cookies but not in database.Could be hacker leaked a rt from cookie
    if (!findUser) {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || findUser.id !== decoded.id)
        return res.status(403).json({
          message: "Invalid refresh token",
        });
      
      return res.status(200).json({
        user:{
          name:findUser.name,
          email:findUser.email
        },
        message: "Authorized",
      });
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: "Something went wrong ",
      error: error.message,
    });
  }
}