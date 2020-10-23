import { mongoose } from '@typegoose/typegoose';
import { Request, Response } from 'express';
import { Like } from '../models/enums';
import Route from '../models/Route';

/**
 * TODO: delete upvote
 * TODO: update function
 */

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
	const { like, routeId } = req.body;

	if (!(like == 1 || like == -1))
		return res.status(400).json({ field: 'like', msg: 'Invalid like' });

	try {
		// Initialize values
		const value = like == 1 ? Like.LIKE : Like.DISLIKE;
		const userId = mongoose.Types.ObjectId(req.session!.userId);

		const upvotes = await Route.findOne({
			_id: routeId,
			'upvotes.userId': userId
		});

		if (upvotes) {
			// Update if user alredy upvotes and the value is different
			const modified = await Route.updateOne(
				{
					_id: routeId,
					'upvotes.userId': userId,
					'upvotes.value': value * -1
				},
				{
					$inc: { votesCounter: value * 2 },
					$set: { 'upvotes.$.value': value }
				}
			);
			// remove upvote/downvote
			if (modified.nModified == 0) {
				await Route.updateOne(
					{ _id: routeId },
					{
						$pull: { upvotes: { userId } },
						$inc: { votesCounter: value * -1 }
					}
				);
			}
		} else {
			// Add un upvote
			await Route.findByIdAndUpdate(routeId, {
				$inc: { votesCounter: value },
				$addToSet: { upvotes: { value, userId } }
			});
		}

		return res.json({ success: true, message: 'Update with success' });
	} catch (error) {
		console.log(error);
		return res.json({ success: false, message: error });
	}
};
