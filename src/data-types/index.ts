export class DataType {
	public static TEXT: string = 'text';
	public static UUID: string = 'uuid';
}

import { Cast } from './cast';
export const cast: (value: string, type: string) => Cast = Cast.cast;
