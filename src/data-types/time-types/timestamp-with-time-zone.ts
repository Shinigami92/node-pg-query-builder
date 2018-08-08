import { DataType } from '../data-type';

export class TimestampWithTimeZoneType extends DataType {
	constructor(precision?: 0 | 1 | 2 | 3 | 4 | 5 | 6) {
		super('timestamp with time zone');
		if (precision !== undefined) {
			this._definition = `timestamp(${precision}) with time zone`;
		}
	}
}

export const TIMESTAMP_WITH_TIME_ZONE: TimestampWithTimeZoneType = new TimestampWithTimeZoneType();
