import { mongoose } from '@typegoose/typegoose';
import { Request, Response } from 'express';
import Route from '../models/Route';
import { votesHandler } from './votesHandler';

export const create = async (req: Request, res: Response) => {
	const {
		title,
		description,
		category,
		difficulty,
		surface,
		attributes,
		path,
		distance,
		min_height,
		max_height
	} = req.body;

	// TODO: validate all inputs

	const author = mongoose.Types.ObjectId(req.session!.userId);

	try {
		const route = new Route({
			author,
			title,
			description,
			category,
			difficulty,
			surface,
			attributes,
			path,
			distance,
			min_height,
			max_height
		});
		await route.save();
		return res.json(route);
	} catch (error) {
		return res.status(400).json(error);
	}
};

export const del = async (req: Request, res: Response) => {
	const { id } = req.params;
	const userId = mongoose.Types.ObjectId(req.session!.userId);

	try {
		const route = await Route.findOneAndDelete({ _id: id, author: userId });
		if (!route) return res.status(400).json({ msg: 'Invalid id' });

		return res.json({ msg: 'Object removed with success!' });
	} catch (error) {
		return res.status(402).json(error);
	}
};

export const get = async (req: Request, res: Response) => {
	const { id } = req.params;

	const route = await Route.findById(id);

	if (!route) return res.status(404).json({ msg: 'Invalid id' });

	return res.json(route);
};

export const getAll = async (_: Request, res: Response) => {
	const routes = await Route.find({});

	return res.json(routes);
};

export const like = async (req: Request, res: Response) => {
	const { value, routeId } = req.body;
	try {
		const result = await votesHandler(
			Route,
			routeId,
			req.session!.userId,
			value
		);
		console.log(result);
		return res.json(result);
	} catch (error) {
		return res.json(error);
	}
};

// export const likeOld = async (req: Request, res: Response) => {
// 	const { like, routeId } = req.body;

// 	if (!(like == 1 || like == -1))
// 		return res.status(400).json({ field: 'like', msg: 'Invalid like' });

// 	try {
// 		// Initialize values
// 		const value = like == 1 ? Like.LIKE : Like.DISLIKE;
// 		const userId = mongoose.Types.ObjectId(req.session!.userId);

// 		const routes = await Route.findOneAndUpdate(
// 			{ _id: routeId, 'upvotes.userId': userId }, // Check if userId alredy upvoted
// 			{ $set: { 'upvotes.$.value': value } }, // If does update
// 			{ new: true },
// 			async (_, raw) => {
// 				// If doesn't push to upvotes
// 				if (!raw) {
// 					const newUpvote = { value, userId };
// 					return await Route.findByIdAndUpdate(routeId, {
// 						$addToSet: { upvotes: newUpvote }
// 					});
// 				} else return raw;
// 			}
// 		);

// 		return res.json(routes);
// 	} catch (error) {
// 		console.log(error);
// 		return res.json(error);
// 	}
// };
