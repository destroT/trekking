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
	public upvote: { value: Like; userId: Ref<typeof User> };
}

const VotesHandler = getModelForClass(VotesHandlerModel);
export default VotesHandler;
