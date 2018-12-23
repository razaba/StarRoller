export default class StorageError extends Error {
	private readonly _innerError: Error;

	constructor(message: string, innerError: Error) {
		super(message);
		this._innerError = innerError;

	}

	public getInnerError(): Error {
		return this._innerError;
	}

}