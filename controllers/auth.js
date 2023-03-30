import { StatusCodes } from "http-status-codes";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";

const register = async (req, res) => {
  const { username, email, password, avatar, bio } = req.body;

  if (!username || !email || !password) {
    throw new BadRequestError("Please Provide All fields");
  }

  const isUserExists = await User.findOne({ email: email });

  if (isUserExists) {
    throw new BadRequestError("User Already Exists");
  }

  //hashing password
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashPassword,
    avatar,
    bio
  });

  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
      userEmail: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );

  res.status(StatusCodes.CREATED).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    password : user.password,
    avatar: user.avatar,
    bio : user.bio,
    token,
  });
};

const login = async (req, res) => {
  const { username, email, password } = req.body;

  if ((!username && !email) || !password) {
    throw new BadRequestError("Please Provide All the fields");
  }

  const isUser = await User.findOne({
     email: email 
  });

  if (!isUser) {
    throw new NotFoundError("Invalid Credentials");
  }

  //compare password
  const comparePassword = await bcrypt.compare(password, isUser.password);

  if (!comparePassword) {
    throw new BadRequestError(
      "Please Make Sure You have entered Correct Password!"
    );
  }

  const token = jwt.sign(
    {
      userId: isUser._id,
      username: isUser.username,
      userEmail: isUser.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );

  res.status(StatusCodes.OK).json({
    _id: isUser._id,
    username: isUser.username,
    email: isUser.email,
    password : isUser.password,
    avatar: isUser.avatar,
    bio : isUser.bio,
    token,
  });
};

const searchUser = async (req, res) => {
  const { search } = req.query;
  const user = await User.find({
    username: { $regex: search, $options: "i" },
  }).select("username avatar _id email bio");

  res.status(StatusCodes.OK).json(user);
};

const getUserInfo = async (req, res) => {
  
  try{
  const user = await User.findById(req.user.id)
  res.status(StatusCodes.OK).json(user);
  }catch (err) {
    console.log(err)
    res.status(500).json({error:err});
}
};

const updateUserName = async(req,res)=>{
  try{
    
    const user = await User.findByIdAndUpdate(
        req.user.id,
        {
            username : req.body.username
        },
        {
            new:true
        }
        )
      res.status(200).json(user);
}catch (err) {
    console.log(err);
    res.status(500).json({error:err});
}
}

const updateUserBio = async(req,res)=>{
  try{
    
    const user = await User.findByIdAndUpdate(
        req.user.id,
        {
            bio : req.body.bio
        },
        {
            new:true
        }
        )
      res.status(200).json(user);
}catch (err) {
    console.log(err);
    res.status(500).json({error:err});
}
}

const updateUserAvatar = async(req,res)=>{
  try{
    
    const user = await User.findByIdAndUpdate(
        req.user.id,
        {
            avatar : req.body.avatar
        },
        {
            new:true
        }
        )
      res.status(200).json(user);
}catch (err) {
    console.log(err);
    res.status(500).json({error:err});
}
}

const updateUserPassword = async(req,res)=>{
  try{
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.findByIdAndUpdate(
        req.user.id,
        {
            password : hashPassword
        },
        {
            new:true
        }
        )
      res.status(200).json(user);
}catch (err) {
    console.log(err);
    res.status(500).json({error:err});
}
}


export { 
  register, 
  login, 
  searchUser,
  getUserInfo,
  updateUserName,
  updateUserBio ,
  updateUserAvatar,
  updateUserPassword 
};
