export class CustomError extends Error {
	public message: string;
	public statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
	}
}

export function createCustomError(message: string, statusCode: number) {
	return new CustomError(message, statusCode);
}
