export function treatDocsMongo(docs: any) {
	return docs.map((doc: any) => {
		return {
			...doc._doc,
			content: Buffer.from(doc.content).toString(),
		};
	});
}
