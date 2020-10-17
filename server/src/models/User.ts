//import * as mongoose from  'mongoose'
import { prop, getModelForClass, pre, ReturnModelType } from '@typegoose/typegoose'
import * as argon2 from 'argon2'
import isEmail from '../utils/validators';

@pre<UserModel>('save', async function (next) {
    
    const hasedPassword = await argon2.hash(this.password);
    this.password = hasedPassword;
    next();
})
class UserModel{

    @prop({
        required: true, 
        unique: true,
        lowercase: true, 
        trim: true, 
        validate: (value) => isEmail(value) 
    })
    email!: string;

    @prop({ required: true, unique: true, trim: true, maxlength: 16, match: /[0-9a-f]*/ })
    username!: string;

    @prop({ required: true, minlength: 4 })
    password!: string;

    public static async findAllUsers(this: ReturnModelType<typeof UserModel>) {
        return this.find({}).exec();
    }
};

const User = getModelForClass(UserModel);
export default User;

// const userSchema = new Schema({
//     email: {
//         type: String,
//         unique: true,
//         required: true,
//         lowercase: true,
//         trim: true
//     },
//     username: {
//         type: String,
//         unique: true,
//         required: true,
//         trim: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// });

// userSchema.pre<IUser>('save', async function (next) {
//     const user = this;
//     if(!user.isModified('password')) return next();
//     const hasedPassword = await argon2.hash(<string>user.password);
//     user.password = hasedPassword;

//     next();
// });



// export default model<IUser>('User', userSchema);