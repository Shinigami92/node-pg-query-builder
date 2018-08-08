import { DataType } from '../data-type';

export class VarcharType extends DataType {
	constructor(n?: number) {
		super('varchar');
		if (n !== undefined) {
			this._definition += `(${n})`;
		}
	}
}

export const VARCHAR: VarcharType = new VarcharType();
