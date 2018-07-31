export interface QueryResolution {
	valueIndex: number;
	text: string;
	values: any[];
}

export interface Resolvable {
	resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution;
	resolve(): string;
}
