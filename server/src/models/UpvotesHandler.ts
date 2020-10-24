import {
	getModelForClass,
	modelOptions,
	mongoose,
	prop,
	Ref,
	ReturnModelType,
	Severity
} from '@typegoose/typegoose';
import { Like } from './enums';
import User from './User';

@modelOptions({
	options: { customName: 'votes', allowMixed: Severity.ALLOW },
	schemaOptions: { discriminatorKey: 'type' }
})
class UpvotesHandler {
	@prop({ default: 0 })
	public votesCounter: number;

	@prop({ type: mongoose.Schema.Types.Mixed, default: [] })
	public votes: { value: Like; userId: Ref<typeof User> }[];

	public static updateVotes(
		this: ReturnModelType<typeof UpvotesHandler>,
		value: Like,
		userId: mongoose.Schema.Types.ObjectId
	) {
		const res = {
			success: true,
			message: `Update with success! ${value} ${userId}`
		};

		return res;
	}
}

const UpvotesHandlerModel = getModelForClass(UpvotesHandler);
export { UpvotesHandlerModel, UpvotesHandler };
