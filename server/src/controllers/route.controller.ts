import { mongoose } from '@typegoose/typegoose';
import { Request, Response } from 'express';
import Route from '../models/Route';

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
