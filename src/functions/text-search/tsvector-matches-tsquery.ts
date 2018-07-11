export class TsVectorMatchesTsQueryFunction {
	public static tsvector_matches_tsquery(tsvector: string, tsquery: string): TsVectorMatchesTsQueryFunction {
		return new TsVectorMatchesTsQueryFunction(tsvector, tsquery);
	}

	constructor(public readonly tsvector: string, public readonly tsquery: string) {}

	public resolve(): string {
		return `${this.tsvector} @@ ${this.tsquery}`;
	}
}
