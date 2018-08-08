import { DataType } from '../data-type';

export class TimeWithoutTimeZoneType extends DataType {
	constructor(precision?: 0 | 1 | 2 | 3 | 4 | 5 | 6) {
		super('time without time zone');
		if (precision !== undefined) {
			this._definition = `time(${precision}) without time zone`;
		}
	}
}

export const TIME_WITHOUT_TIME_ZONE: TimeWithoutTimeZoneType = new TimeWithoutTimeZoneType();
