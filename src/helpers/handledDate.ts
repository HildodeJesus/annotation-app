export function treatNumber(number: number): string {
	let treating =
		number.toString().length == 1 ? `0${number}` : number.toString();

	return treating;
}

export function formatDate(dateReceived: number | Date) {
	const date = new Date(dateReceived);

	let day = treatNumber(date.getDate());
	let month = treatNumber(date.getMonth() + 1);
	let year = treatNumber(date.getFullYear());
	let hours = treatNumber(date.getHours());
	let minutes = treatNumber(date.getMinutes());

	return `${day}-${month}-${year} às ${hours}:${minutes}`;
}
