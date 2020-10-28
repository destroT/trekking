import { Request, Response } from 'express';
import Review from '../models/Review';
import { mongoose } from '@typegoose/typegoose';
import { votesHandler } from './votesHandler';

export const add = async (req: Request, res: Response) => {
	const { routeId, title, description, rank } = req.body;

	try {
		const author = mongoose.Types.ObjectId(req.session!.userId);
		const route = mongoose.Types.ObjectId(routeId);
		const newReview = new Review({
			route,
			author,
			title,
			description,
			rank,
		});
		await newReview.save();
		return res.json(newReview);
	} catch (error) {
		console.log(error);
		return res.json({ msg: 'Error creating the review' });
	}
};

export const like = async (req: Request, res: Response) => {
	const { value, reviewId } = req.body;
	try {
		const result = await votesHandler(
			Review,
			reviewId,
			req.session!.userId,
			value
		);
		return res.json(result);
	} catch (error) {
		return res.json(error);
	}
};

export const getAll = async (_: Request, res: Response) => {
	const reviews = await Review.find({});
	return res.json(reviews);
};

export const get = async (req: Request, res: Response) => {
	const { id } = req.params;
	const review = await Review.findById(id);

	if (!review) return res.status(404).json({ msg: 'Invalid Id' });
	return res.json(review);
};

// IDK why I can't call it delete
export const del = async (req: Request, res: Response) => {
	const { id } = req.params;
	const userId = mongoose.Types.ObjectId(req.session!.userId);

	try {
		// * This verison runs in ~50-70ms
		const review = await Review.findOneAndDelete({
			_id: id,
			author: userId,
		});
		if (!review) return res.status(400).json({ msg: 'Invalid id' });
		return res.json({ msg: 'Object removed with success!' });
	} catch (error) {
		return res.status(402).json(error);
	}
};
