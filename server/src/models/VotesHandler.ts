import {
	getModelForClass,
	modelOptions,
	mongoose,
	prop,
	Ref,
	Severity
} from '@typegoose/typegoose';
import { Like } from './enums';
import User from './User';

@modelOptions({ options: { customName: 'Votes', allowMixed: Severity.ALLOW } })
class VotesHandlerModel {
	@prop({ default: 0 })
	votesCounter: number;

	@prop({ type: mongoose.Schema.Types.Mixed })
	static upvotes: { value: Like; userId: Ref<typeof User> }[];

	public static async updateVotes(
		userId: mongoose.Types.ObjectId,
		value: number
	) {
		const upvotes = this.upvotes;
		console.log(upvotes, userId, value);
		// const user = await User.findById(userId);
		// const exists = upvotes.filter(u => u.userId == user);
		// return await this.save();
	}
}

// const updateVotes = async function (
// 	this: ReturnModelType<typeof VotesHandler>,
// 	userId: mongoose.Schema.Types.ObjectId,
// 	like: number
// )
// {
// 	const value = like == 1 ? Like.LIKE : Like.DISLIKE;

// 	// Check if user alredy upvoted
// 	const upvotes = await this.findOne({ 'upvotes.userId': userId });

// 	if (upvotes) {
// 		// Update if user alredy upvotes and the value is different
// 		const modified = await this.updateOne(
// 			{
// 				'upvotes.userId': userId,
// 				'upvotes.value': value * -1
// 			},
// 			{
// 				$inc: { votesCounter: value * 2 },
// 				$set: { 'upvotes.$.value': value }
// 			}
// 		);
// 		// remove upvote/downvote
// 		if (modified.nModified == 0) {
// 			await this.updateOne(
// 				{ _id: this._id },
// 				{
// 					$pull: { upvotes: { userId } },
// 					$inc: { votesCounter: value * -1 }
// 				}
// 			);
// 		}
// 	} else {
// 		// Add un upvote
// 		await Route.findByIdAndUpdate(routeId, {
// 			$inc: { votesCounter: value },
// 			$addToSet: { upvotes: { value, userId } }
// 		});
// 	}
// };
const VotesHandler = getModelForClass(VotesHandlerModel);
export default VotesHandler;
