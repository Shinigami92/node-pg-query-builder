import { DataType } from '../data-type';

export class TimeWithTimeZoneType extends DataType {
	constructor(precision?: 0 | 1 | 2 | 3 | 4 | 5 | 6) {
		super('time with time zone');
		if (precision !== undefined) {
			this._definition = `time(${precision}) with time zone`;
		}
	}
}

export const TIME_WITH_TIME_ZONE: TimeWithTimeZoneType = new TimeWithTimeZoneType();
