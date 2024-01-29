import express, { json } from "express";
import createToken from"../utils/createToken.js"
import bcrypt from 'bcryptjs';
import User from "../models/userSchema.js";


const createUser = async(req, res)=>{
    try {
        console.log(req.body);
        const { username, email, password, location } = req.body;
        const existUser = await User.findOne({ email });


        if (!existUser) {
            const salt = await bcrypt.genSalt(10);// for hashing the password
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = await User.create({
                username,
                email,
                password: hashedPassword,
                location,
                isWorker:false
            })
          
           
            createToken(res, newUser._id);
            
            
            console.log(newUser);

            


            res.status(201).json({
                usename: newUser.username,
                email: newUser.email,
                location: newUser.location,
                isWorker:newUser.isWorker


            })
        }else{
            res.status(400).json({
                message:"User already exist"
            })
        }



    } catch (error) {
        res.status(401).json({
            message:error.message
        })
    }
}
//for creating the serviceman
const createWorker = async (req, res) => {
    try {
        const { email } = req.body; 
        
        const existUser = await User.findOne({ email });
        
        if (existUser) {
            existUser.isWorker = true; 
            await existUser.save();
            res.status(200).json({ message: "User updated to worker" });
        } else {
            res.status(4004).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const loginUser = async (req, res) => {
    try {
        console.log('login');
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "Please fill all inputs"
            });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Please enter valid credentials"
            });
        }

        createToken(res, existingUser._id);
        console.log(existingUser);

        res.status(200).json({
            _id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
            isWorker: existingUser.isWorker,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const logoutCurrentUser = async (req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'logout successfully' });
  };

export{createUser, createWorker, logoutCurrentUser, loginUser}