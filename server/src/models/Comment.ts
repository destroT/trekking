import {
	prop,
	Ref,
	modelOptions,
	getModelForClass
} from '@typegoose/typegoose';
import VotesHandler from './VotesHandler';
import User from './User';

@modelOptions({ options: { customName: 'Comment' } })
class CommentModel {
	// @prop({ ref: () => Review, required: true })
	// review!: Ref<typeof Review>;

	@prop({ ref: () => User, required: true })
	author!: Ref<typeof User>;

	// @prop({ ref: () => CommentModel })
	// parent?: CommentModel;

	@prop({ required: true, maxlength: 140, minlength: 3 })
	text: string;

	@prop({ ref: () => VotesHandler, required: true })
	votes!: Ref<typeof VotesHandler>;
}

const Comment = getModelForClass(CommentModel);
export default Comment;
