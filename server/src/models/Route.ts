//import * as mongoose from 'mongoose';
import {
	Ref,
	prop,
	getModelForClass,
	Severity,
	modelOptions
} from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Category, Surface, Difficulty, Attributes, Like } from './enums';
import * as mongoose from 'mongoose';
import User from './User';

/**
 * Author {User}: required
 * Title: required
 * Description: required
 * Category: required
 * Difficulty: required
 * Surface: required
 * Attributes
 * Path [{Coordinates}]
 * Waypoints[{Coordinates, description, photos}]
 * Distance: required
 * min_height
 * max_height
 * upvotes [{Like, User}]
 *
 * TODO: Waypoints
 */
@modelOptions({ options: { customName: 'Route', allowMixed: Severity.ALLOW } })
class RouteModel extends TimeStamps {
	@prop({ ref: () => User, required: true })
	author!: Ref<typeof User>;

	@prop({ required: true })
	title!: string;

	@prop({ required: true })
	description!: string;

	@prop({ enum: Category, required: true, type: String })
	category!: Category;

	@prop({ enum: Difficulty, required: true, type: String })
	difficulty!: Difficulty;

	@prop({ enum: Surface, required: true, type: String })
	surface!: Surface;

	@prop({ enum: Attributes, type: String })
	attributes: Attributes[];

	@prop({ type: mongoose.Schema.Types.Mixed })
	path: [{ lat: number; lng: number }];

	// @prop({ type: () => [Number, Number, String, [String]] })
	// @prop({ type: mongoose.Schema.Types.Mixed })
	// waypoints?: { lat: number, lng: number, description: string, photos:  mongoose.Schema.Types.ObjectId[] }[];

	// meters
	@prop({ required: true })
	distance: number;

	@prop()
	min_height: number;
	@prop()
	max_height: number;

	@prop({ type: mongoose.Schema.Types.Mixed })
	upvotes: { value: Like; userId: Ref<typeof User> }[];
}

const Route = getModelForClass(RouteModel);
export default Route;
