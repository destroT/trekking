//import * as mongoose from  'mongoose'
import { prop, getModelForClass, pre, ReturnModelType } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import * as argon2 from 'argon2'
import isEmail from '../utils/validators';

@pre<UserModel>('save', async function (next) {
    // Hash the password before Insert
    const hasedPassword = await argon2.hash(this.password);
    this.password = hasedPassword;
    next();
})
class UserModel extends TimeStamps{

    @prop({
        required: true, 
        unique: true,
        lowercase: true, 
        trim: true, 
        validate: (value) => isEmail(value) 
    })
    email!: string;

    @prop({ required: true, unique: true, trim: true, minlength: 3, maxlength: 16, match: /[0-9a-f]*/ })
    username!: string;

    @prop({ required: true, minlength: 4 })
    password!: string;

    @prop()
    timestamps: { createdAt: 'created_at',updatedAt: 'updated_at'};

    public static async findAllUsers(this: ReturnModelType<typeof UserModel>) {
        return this.find({}).exec();
    }
};

const User = getModelForClass(UserModel);
export default User;
