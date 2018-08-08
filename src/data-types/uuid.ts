import { DataType } from './data-type';

export class UuidType extends DataType {
	constructor() {
		super('uuid');
	}
}

export const UUID: UuidType = new UuidType();
