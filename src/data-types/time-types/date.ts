import { DataType } from '../data-type';

export class DateType extends DataType {
	constructor() {
		super('date');
	}
}

export const DATE: DateType = new DateType();
