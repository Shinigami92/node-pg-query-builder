import { DataType } from './data-type';

export class BooleanType extends DataType {
	constructor() {
		super('boolean');
	}
}

export const BOOLEAN: BooleanType = new BooleanType();
