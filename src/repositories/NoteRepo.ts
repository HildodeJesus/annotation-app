import { v4 } from "uuid";

import { formatDate } from "../helpers/handledDate";
import { treatDocsMongo } from "../helpers/treatDocsMongo";
import NoteModel, { INote } from "../models/NoteModel";

type Option = {
	limit: number | null;
};

class Note {
	public title: string;
	public content: Buffer;
	public userId: string;
	public checked: boolean;
	public createdAt: Date;
	public errors: string[];

	constructor(props?: Omit<INote, "createdAt" | "_id">) {
		Object.assign(this, props);

		this.errors = [];
	}

	async create() {
		this.validation();

		if (this.errors.length > 0) return;

		const newNote = {
			_id: v4(),
			title: this.title,
			content: this.content,
			userId: this.userId,
			checked: this.checked,
		};

		await NoteModel.create(newNote);

		return;
	}

	async update(id: string) {
		this.validation();

		if (this.errors.length > 0) return;

		const updatedNote = {
			title: this.title,
			content: this.content,
			userId: this.userId,
			checked: this.checked,
		};

		await NoteModel.findByIdAndUpdate(id, updatedNote);

		return;
	}

	async delete(id: string) {
		const noteExists = await this.getNoteById(id);
		if (noteExists == null) this.errors.push("Não existe essa anotação");

		if (this.errors.length > 0) return;

		await NoteModel.findByIdAndDelete(id);
		return;
	}

	async getNoteById(id: string) {
		const note = await NoteModel.findById(id);

		const treatedNote = treatDocsMongo([note]);

		return {
			...treatedNote[0],
			createdAt: formatDate(treatedNote[0].createdAt),
		};
	}

	async getUserNotes(userId: string, option: Option) {
		const countNotes = await NoteModel.find({
			userId: userId,
		}).countDocuments();

		const notesForUser = await NoteModel.find({ userId: userId })
			.limit(option.limit)
			.sort("-createdAt");

		const treatedNotes = treatDocsMongo(notesForUser);

		return { data: treatedNotes, count: countNotes };
	}

	async getUserHighlight(userId: string, option: Option) {
		const countHighlight = await NoteModel.find({
			userId: userId,
			checked: true,
		}).countDocuments();

		const userHighlight = await NoteModel.find({
			userId: userId,
			checked: true,
		})
			.sort("-createdAt")
			.limit(option.limit);

		const treatedHighlight = treatDocsMongo(userHighlight);

		return {
			data: treatedHighlight,
			count: countHighlight,
		};
	}

	validation() {
		this.cleanUp();

		if (this.title == "") this.errors.push("Dê um título para sua anotação.");
		if (this.userId == "") this.errors.push("O id não foi passado.");

		return;
	}

	cleanUp() {
		this.title = this.title == undefined ? "" : this.title;
		this.content = this.content == undefined ? null : Buffer.from(this.content);
		this.userId = this.userId == undefined ? "" : this.userId;
	}
}

export default Note;
