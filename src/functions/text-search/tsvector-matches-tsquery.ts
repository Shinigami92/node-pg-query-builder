import { TsQueryAliasReference } from '../../definitions/tsquery-alias-reference';
import { TsVectorAliasReference } from '../../definitions/tsvector-alias-reference';
import { TextSearchFunction } from './text-search-function';
import { ToTsQueryFunction } from './to-tsquery';
import { ToTsVectorFunction } from './to-tsvector';

export class TsVectorMatchesTsQueryFunction extends TextSearchFunction {
	constructor(
		public readonly tsvector: ToTsVectorFunction | TsVectorAliasReference,
		public readonly tsquery: ToTsQueryFunction | TsQueryAliasReference
	) {
		super();
	}

	public resolve(): string {
		let tsvector: string;
		if (this.tsvector instanceof TsVectorAliasReference) {
			tsvector = this.tsvector.aliasName;
		} else {
			tsvector = this.tsvector.resolve();
		}
		let tsquery: string;
		if (this.tsquery instanceof TsQueryAliasReference) {
			tsquery = this.tsquery.aliasName;
		} else {
			tsquery = this.tsquery.resolve();
		}
		return `${tsvector} @@ ${tsquery}`;
	}
}

export function tsvector_matches_tsquery(
	tsvector: ToTsVectorFunction | TsVectorAliasReference,
	tsquery: ToTsQueryFunction | TsQueryAliasReference
): TsVectorMatchesTsQueryFunction {
	return new TsVectorMatchesTsQueryFunction(tsvector, tsquery);
}
