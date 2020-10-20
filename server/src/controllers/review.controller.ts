import { Request, Response } from 'express'
import Review from '../models/Review';
import { Like } from '../models/enums';
import { mongoose } from '@typegoose/typegoose';

export const add = async (req: Request, res: Response) => {
    const { title, description, rank } = req.body;

    try {
        const author = mongoose.Types.ObjectId(req.session!.userId);
        const newReview = new Review({ author, title, description, rank});
        await newReview.save();  
        return res.json(newReview);      
    } catch (error) {
        console.log(error);
        return res.json({ msg: "Error creating the review" });
    }
}

export const like = async (req: Request, res: Response) => {
    const { like, reviewId } = req.body;
    
    if( !(like == 1 || like == -1) )
    return res.status(400).json({ field: "like", msg: "Invalid like"});

    try {
        // Search the review
        const review = await Review.findById(reviewId);
        if(!review) return res.status(404).json({msg: "Invalid id, the review could be deleted."});
        
        // Initialize values
        const value  = (like == 1) ? Like.LIKE : Like.DISLIKE;
        const userId = mongoose.Types.ObjectId(req.session!.userId);

        // Check if the users alredy liked the review
        const upvotes = review.upvotes.filter(e => (e.userId == req.session!.userId));
        
        // No changes to do
        if( upvotes.length == 1 && upvotes[0].value == value) return res.json(review);

        // TODO Improve
        // Make the changes 
        review.upvotes = review.upvotes.filter(e => !upvotes.includes(e));  
        const newUpvote = {value: value, userId: userId};
        review.upvotes.push(newUpvote);

        // Update the database
        await review.save();

        // Response
        return res.json(review);

    } catch (error) {
        console.log(error);
        return res.json({ msg: "Error updating the database" });
    }
};

export const getAll =  async (_: Request, res: Response) => {
    const reviews = await Review.find({});
    return res.json(reviews);
}

export const get = async (req: Request, res: Response) => {
    const { id } = req.params;
    const review = await Review.findById(id);

    if(!review) return res.status(404).json({ msg: "Invalid Id" });
    return res.json(review);
}


// IDK why I can't call it delete
export const del = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = mongoose.Types.ObjectId(req.session!.userId);

    try {
        // * This verison runs in ~50-70ms
        const review = await Review.findOneAndDelete({ _id: id, author: userId});
        if(!review)
            return res.status(400).json({ msg: "Invalid id" });
        return res.json({ msg: "Object removed with success!" });

        // * It manage better errors but it's superslow ~500ms
        // // Search the review and check if it was created from the same user
        // const review = await Review.findById(id);

        // if(!review) return res.status(404).json({ msg: "Object does not exists, invalid Id" });
        // if(review.author?.toString() != userId) return res.status(403).json({ msg: "You are not authorized to modify the object" });
        
        // await Review.findByIdAndRemove(id);

    } catch (error) {
        return res.status(402).json(error);
    }
}