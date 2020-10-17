import { Request, Response } from 'express'
import * as argon2 from 'argon2'
import User from '../models/User';

export const signUp = async (req:Request, res:Response) => {
    const { username, email, password} = req.body;

    if(!username || !email || !password) {
        res.status(401);
        return res.json({ msg: "Please fill all the fields" })
    }

    const user = await User.findOne({ username: username, email: email });
    if(user) {
        res.status(400);
        res.json({ msg: "Username or Password alredy exists" });
    }

    const newUser = new User({username, email, password});
    await newUser.save();


    return res.json(newUser);
};

export const signIn = async (req:Request, res:Response) => {
    const { username, password } = req.body;

    const errMsg = { msg: "Invalid Username or Password" };

    // Invalid Inputs
    if(!username || !password) return res.status(400).json(errMsg);

    const user = await User.findOne({username});

    // Username not exists
    if(!user)  return res.status(400).json(errMsg);


    const decrypt = await argon2.verify(<string>user.password, password);
    // Create JWT

    // Invalid Login
    if(!decrypt) return res.status(400).json(errMsg);

    // Return Token
    return res.json({ _id: user._id, username: user.username });
}