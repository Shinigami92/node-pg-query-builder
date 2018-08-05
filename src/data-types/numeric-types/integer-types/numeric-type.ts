import { DataType } from '../../data-type';

export class NumericType extends DataType {
	constructor(precision?: number, scale?: number) {
		super('numeric');
		if (precision !== undefined && scale !== undefined) {
			this._definition += `(${precision}, ${scale})`;
		} else if (precision !== undefined && scale === undefined) {
			this._definition += `(${precision})`;
		}
	}
}

export const NUMERIC: NumericType = new NumericType();
