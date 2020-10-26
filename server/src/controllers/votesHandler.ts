import { Like } from '../models/enums';

/**
 * TODO: Improve performance, it's really slow
 */

export const votesHandler = async (
	Model: any,
	id: string,
	user: string,
	like: number
): Promise<{ status: number; response: any }> => {
	try {
		// Get model istance
		let m = await Model.findById(id);
		if (!m) return { status: 404, response: { message: 'Invalid Id' } };

		// Initialize values
		const value = like == 1 ? Like.LIKE : Like.DISLIKE;
		const userId = user;

		// Check if the users alredy liked the review
		const exists = m.votes.filter((e: any) => e.userId == userId);

		// Alredy voted with same value -> remove
		if (exists[0]) {
			// Equal -> remove vote
			if (exists[0].value == value) {
				m.votesCounter += value * -1;
			} else {
				// Update vote
				m.votesCounter += value * 2;
				m.votes.push({ value, userId });
			}
			m.votes = m.votes.filter((e: any) => !exists.includes(e));
		} else {
			// Add vote
			const newVote = { value, userId };
			m.votes.push(newVote);
			m.votesCounter += value;
		}

		// Save and return response
		await m.save();
		return { status: 200, response: m };
	} catch (error) {
		return { status: 400, response: error };
	}
};
