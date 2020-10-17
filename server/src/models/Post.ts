import { prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import User from './User';

class PostModel extends TimeStamps{

    @prop({ required: true })
    title!: string;
    
    @prop({ required: true })
    description!: string;
    
    @prop({ ref: () => User, required: true})
    author!: Ref<typeof User>;
    
    // From 1 to 100 Scale
    @prop({ required: true, min: 1, max: 100 })
    rank!: number;

    @prop({ default: 0 })
    value: number;

    // ADD Place References
    // ADD Comment references
    // ADD value
}

const Post = getModelForClass(PostModel);
export default Post;