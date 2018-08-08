import { DataType } from '../../data-type';

export class BigintType extends DataType {
	constructor() {
		super('bigint');
	}
}

export const BIGINT: BigintType = new BigintType();
