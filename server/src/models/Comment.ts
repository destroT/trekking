import {
	prop,
	Ref,
	modelOptions,
	getDiscriminatorModelForClass
} from '@typegoose/typegoose';
import { UpvotesHandlerModel, UpvotesHandler } from './UpvotesHandler';
import User from './User';

@modelOptions({ options: { customName: 'Comment' } })
class CommentModel extends UpvotesHandler {
	// @prop({ ref: () => Review, required: true })
	// review!: Ref<typeof Review>;

	@prop({ ref: () => User, required: true })
	author!: Ref<typeof User>;

	// @prop({ ref: () => CommentModel })
	// parent?: CommentModel;

	@prop({ required: true, maxlength: 140, minlength: 3 })
	text: string;
}

const Comment = getDiscriminatorModelForClass(
	UpvotesHandlerModel,
	CommentModel
);
export default Comment;
