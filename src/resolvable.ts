export interface QueryResolution {
	valueIndex: number;
	text: string;
	values: any[];
}

export interface Resolvable {
	resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution;
	resolve(): string;
}

export function isResolvable(value: any): value is Resolvable {
	return (
		value !== undefined &&
		value !== null &&
		typeof value === 'object' &&
		typeof value.resolve === 'function' &&
		typeof value.resolveQuery === 'function'
	);
}
