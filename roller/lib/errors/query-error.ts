export default class QueryError extends Error {
	constructor(message: string) {
		super(message);
	}
}