import mongoose from 'mongoose';
import { Request, Response } from 'express';
import Comment from '../models/Comment';

export const create = async (req: Request, res: Response) => {
	const { text } = req.body;

	console.log(`Creating comment: ${text}`);
	const author = mongoose.Types.ObjectId(req.session!.userId);
	const comment = new Comment({ text, author });
	console.log(typeof comment);
	await comment.save();
	return res.json(comment);
};

export const getAll = async (req: Request, res: Response) => {
	const { text } = req.body;

	return res.json({ text });
};
