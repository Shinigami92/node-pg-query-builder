export abstract class DataType {
	protected _definition: string;
	constructor(definition: string) {
		this._definition = definition;
	}

	get definition(): string {
		return this._definition;
	}
}
