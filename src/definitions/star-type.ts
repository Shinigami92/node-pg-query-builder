import { DataType } from '../data-types/data-type';

export class StarType extends DataType {
	constructor() {
		super('*');
	}
}

export const STAR_TYPE: StarType = new StarType();
