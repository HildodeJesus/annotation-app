import UserModel, { IUser } from "../models/UserModel";
import validator from "validator";
import bcrypt from "bcrypt";

class User {
	public name: string;
	public email: string;
	public password: string;
	public errors: string[];

	constructor(props?: Omit<IUser, "createdAt">) {
		Object.assign(this, props);

		this.errors = [];
	}

	async create() {
		this.validation();
		if (this.errors.length > 0) return;

		const userExists = await this.getByEmail(this.email);
		if (userExists) {
			this.errors.push("Usuário já existe");
			return;
		}

		const bcryptSalt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(this.password, bcryptSalt);

		const newUser = {
			name: this.name,
			email: this.email,
			password: passwordHash,
		};

		await UserModel.create(newUser);

		return;
	}

	async getByEmail(email: string) {
		const user = await UserModel.findOne({ email: email });

		return user;
	}

	validation() {
		this.cleanUp();

		if (this.name == "") this.errors.push("Nome é obrigatório");
		if (!validator.isEmail(this.email)) this.errors.push("Email é inválido");
		if (this.password.length < 6)
			this.errors.push("A senha deve ter pelos menos 6 caracteres");

		return;
	}

	cleanUp() {
		this.name = this.name == undefined ? "" : this.name;
		this.email = this.email == undefined ? "" : this.email;
		this.password = this.password == undefined ? "" : this.password;
	}
}

export default User;
