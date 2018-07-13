import { DataType } from '../data-type';

export class TextType extends DataType {
	constructor() {
		super('text');
	}
}

export const TEXT: TextType = new TextType();
