import { DataType } from '../data-type';

export class TimestampWithoutTimeZoneType extends DataType {
	constructor(precision?: 0 | 1 | 2 | 3 | 4 | 5 | 6) {
		super('timestamp without time zone');
		if (precision !== undefined) {
			this._definition = `timestamp(${precision}) without time zone`;
		}
	}
}

export const TIMESTAMP_WITHOUT_TIME_ZONE: TimestampWithoutTimeZoneType = new TimestampWithoutTimeZoneType();
