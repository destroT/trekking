import { Request, Response } from 'express'
import * as argon2 from 'argon2'
import User from '../models/User';

export const signUp = async (req:Request, res:Response) => {
    const { username, email, password} = req.body;

    if(!username || !email || !password) {
        res.status(401);
        return res.json({ msg: "Please fill all the fields" })
    }

    // Check if username or password alredy in use
    const user = await User.find({$or: [ {username}, {email}]});
    if(user[0]) {
        console.log(user[0]);
        res.status(400);
        return res.json({ msg: "Invalid Username or Email" });
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
    
    // Store the id in the session
    req.session!.userId = user.id;
    console.log(req.session!.userId);
    // Invalid Login
    if(!decrypt) return res.status(400).json(errMsg);

    // Return Token
    return res.json({ _id: user._id, username: user.username });
}

export const me = async (req:Request, res:Response) => {
    const id = req.session!.userId;
    const user = await User.findById(id);
    
    if(!user) return res.json(400).json({ msg: "user not found "});

    return res.json({_id: user._id, username: user.username, email: user.email});
}

export const all = async (_:Request, res:Response) => {
    const users = await User.find().select('_id username').exec();
    return res.json(users);
}