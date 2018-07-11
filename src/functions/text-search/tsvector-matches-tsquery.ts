import { TextSearchFunction } from './text-search-function';

export class TsVectorMatchesTsQueryFunction extends TextSearchFunction {
	public static tsvector_matches_tsquery(tsvector: string, tsquery: string): TsVectorMatchesTsQueryFunction {
		return new TsVectorMatchesTsQueryFunction(tsvector, tsquery);
	}

	constructor(public readonly tsvector: string, public readonly tsquery: string) {
		super();
	}

	public resolve(): string {
		return `${this.tsvector} @@ ${this.tsquery}`;
	}
}
