import { DataType } from '../data-type';

export class CharType extends DataType {
	constructor(n?: number) {
		super('char');
		if (n !== undefined) {
			this._definition += `(${n})`;
		}
	}
}

export const CHAR: CharType = new CharType();
