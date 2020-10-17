import { model, Schema, Document } from  'mongoose'
import * as argon2 from 'argon2'
//import { SECRET } from '../config/constants'

;
export interface IUser extends Document{
    email: String,
    username: String,
    password: String
}

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre<IUser>('save', async function (next) {
    const user = this;
    if(!user.isModified('password')) return next();
    const hasedPassword = await argon2.hash(<string>user.password);
    user.password = hasedPassword;

    next();
});


userSchema.methods.comparePassword = async function(password: string): Promise<Boolean> {
    return await argon2.verify(password, this.password);
}

export default model<IUser>('User', userSchema);