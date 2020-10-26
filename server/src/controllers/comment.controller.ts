import mongoose from 'mongoose';
import { Request, Response } from 'express';
import Comment from '../models/Comment';
import VotesHandler from '../models/VotesHandler';

export const create = async (req: Request, res: Response) => {
	const { text } = req.body;

	console.log(`Creating comment: ${text}`);
	const author = mongoose.Types.ObjectId(req.session!.userId);
	const comment = new Comment({ text, author });
	console.log(typeof comment);
	await comment.save();
	return res.json(comment);
};

export const updateVote = async (req: Request, res: Response) => {
	const { value } = req.body;
	const userId = mongoose.Types.ObjectId(req.session!.userId);
	const result = await VotesHandler.updateVotes(userId, value);
	res.json(result);
};

export const getAll = async (req: Request, res: Response) => {
	const { text } = req.body;

	return res.json({ text });
};
