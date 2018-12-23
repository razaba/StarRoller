export default class ExtractionError extends Error {
	private readonly _innerError: Error;

	constructor(message: string, innerError: Error) {
		super(message);
		this._innerError = innerError;
	}

	public innerError(): Error {
		return this._innerError;
	}
}