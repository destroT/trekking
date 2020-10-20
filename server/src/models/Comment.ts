import { prop, getModelForClass } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";


class CommentModel extends TimeStamps {

    
    
}

const Comment = getModelForClass(CommentModel);
export default Comment;