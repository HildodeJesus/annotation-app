import { model, Schema } from "mongoose";

export interface INote {
	_id: string;
	title: string;
	content: Buffer;
	userId: string;
	checked: boolean;
	createdAt: Date;
}

const NoteSchema = new Schema<INote>({
	_id: { type: String, required: true },
	title: { type: String, required: true },
	content: { type: Buffer },
	userId: { type: String, required: true },
	checked: { type: Boolean, required: true },
	createdAt: { type: Date, default: Date.now },
});

const NoteModel = model<INote>("Notes", NoteSchema);

export default NoteModel;
