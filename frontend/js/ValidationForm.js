let optionsDefault = {
	size: 0,
	verifyEmail: false,
};

class ValidationInput {
	/*
	form: string
	input: string
	output: string
	options: optionsDefault
	*/

	constructor(form, input, output, options) {
		this.form = document.getElementById(form);
		this.output = document.getElementById(output);
		this.input = document.getElementById(input);

		this.options = {
			size: options.size || 0,
			verifyEmail: options.verifyEmail || false,
		};

		this.errors = [];
	}

	run() {
		if (!this.form) return;
		console.log("init");
		this.event();
	}

	event() {
		this.form.addEventListener("submit", e => {
			e.preventDefault();
			this.validation();

			if (this.errors.length == 0) this.form.submit();
		});
	}

	validation() {
		this.errors = [];
		if (this.options.size && this.input.value.length < this.options.size)
			this.errors.push(
				`Deve possuir pelo menos ${this.options.size} caracteres`
			);

		if (this.options.verifyEmail && !this.isEmail(this.input.value))
			this.errors.push("E-mail informado é inválido");

		if (this.errors.length > 0) this.render();
	}

	render() {
		const treatingErrors = this.errors.reduce((accumulator, currentValue) => {
			return accumulator + `<p class="text-danger mb-1">${currentValue}</p>`;
		}, "");

		this.output.innerHTML = treatingErrors;
		return;
	}

	isEmail(email) {
		console.log(email);
		let regexEmail =
			/([a-z0-9\.\-]{2,})@([a-z0-9]{2,})(\.[a-z]{2,})(\.[a-z]{2,})?/gi;
		let testRegex = regexEmail.test(email);

		return testRegex;
	}
}

export default ValidationInput;
