export class DataType {
	public static TEXT: string = 'text';
	public static UUID: string = 'uuid';
}

export function cast(value: string, type: string): string {
	return `'${value}'::${type}`;
}
