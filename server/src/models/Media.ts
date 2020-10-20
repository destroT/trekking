import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import User from "./User";


class MediaModel extends TimeStamps {
    
    @prop({ ref: () => User, required: true})
    owner!: Ref<typeof User>;

    @prop({ required: true })
    url!: string;

}

const Media = getModelForClass(MediaModel);
export default Media;