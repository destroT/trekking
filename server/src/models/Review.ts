//import * as mongoose from  'mongoose'
import { prop, Ref, getModelForClass, mongoose, modelOptions, Severity, pre } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Like } from './enums';
import Route from './Route';
import User from './User';

@pre<ReviewModel>('save', function(next) {
    try {
        let c = 0;

        if(this.upvotes !== undefined)
            this.upvotes.filter(e => c = c + e.value);
        
        this.upvoteCounter = c;
        
        next();
    } catch (error) {
        console.log(error);
    } 
})
@modelOptions({ options: { customName: 'Review', allowMixed: Severity.ALLOW}})
class ReviewModel extends TimeStamps{

    @prop({ ref: () => Route})
    route: Ref<typeof Route>;

    @prop({ ref: () => User, required: true})
    author!: Ref<typeof User>;

    @prop({ required: true })
    title!: string;
    
    @prop({ required: true })
    description!: string;

    @prop({ required: true, min: 0, max: 100 })
    rank!: number;

    @prop({ type: mongoose.Schema.Types.Mixed })
    upvotes: { value: Like, userId:  Ref<typeof User>} [];

    @prop({ default: 0 })
    upvoteCounter?: number;
    // @prop({ type: mongoose.Schema.Types.Mixed })
    // upvotes: Map<Like, mongoose.Schema.Types.ObjectId>[];

//    @prop({ ref: () => User })

    //photos: [{ url: string, userId: Ref<typeof User> }];
  
    // @prop({ ref: () => Comment })
    // comments: Ref<typeof Comment>[];

};


const Review = getModelForClass(ReviewModel);
export default Review;
