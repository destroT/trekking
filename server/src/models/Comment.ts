import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import Review from "./Review";
import User from "./User";


class CommentModel extends TimeStamps {

    @prop({ ref: () => Review})
    review!: Ref<typeof Review>;

    @prop({ ref: () => User, required: true})
    author!: Ref<typeof User>;
    
    @prop()
    parent?: ;

    @prop({ required: true, maxlength: 140, minlength: 5 })
    comment: string;
}

const Comment = getModelForClass(CommentModel);
export default Comment;