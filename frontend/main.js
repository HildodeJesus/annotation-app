import "regenerator-runtime/runtime";

import ValidationInput from "./js/ValidationForm";

new ValidationInput("form-register", "email", "emailHelp", {
	verifyEmail: true,
}).run();

new ValidationInput("form-register", "password", "passwordHelp", {
	size: 6,
}).run();

new ValidationInput("form-register", "name", "nameHelp", { size: 1 }).run();
