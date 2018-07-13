export class DataType {
	public static readonly DATE: string = 'date';
	public static readonly INTEGER: string = 'integer';
	public static readonly TEXT: string = 'text';
	public static readonly UUID: string = 'uuid';
}

import { Cast } from './cast';
export const cast: (value: string, type: string) => Cast = Cast.cast;
