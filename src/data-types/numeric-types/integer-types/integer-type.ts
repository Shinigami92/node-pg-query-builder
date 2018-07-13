import { DataType } from '../../data-type';

export class IntegerType extends DataType {
	constructor() {
		super('integer');
	}
}

export const INTEGER: IntegerType = new IntegerType();
