import { model, Schema } from "mongoose";

export interface IUser {
	id?: string;
	name: string;
	email: string;
	password: string;
	createdAt: Date;
}

const UserSchema = new Schema<IUser>({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

const UserModel = model<IUser>("Users", UserSchema);

export default UserModel;
