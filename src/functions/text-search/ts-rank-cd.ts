import { TsQueryAliasReference } from '../../definitions/tsquery-alias-reference';
import { TsVectorAliasReference } from '../../definitions/tsvector-alias-reference';
import { TextSearchFunction } from './text-search-function';
import { ToTsQueryFunction } from './to-tsquery';
import { ToTsVectorFunction } from './to-tsvector';

export class TsRankCdFunction extends TextSearchFunction {
	constructor(
		public readonly textsearch: ToTsVectorFunction | TsVectorAliasReference,
		public readonly query: ToTsQueryFunction | TsQueryAliasReference
	) {
		super();
	}

	public resolve(): string {
		let textsearch: string;
		let query: string;
		if (this.textsearch instanceof TsVectorAliasReference) {
			textsearch = this.textsearch.aliasName;
		} else {
			textsearch = this.textsearch.resolve();
		}
		if (this.query instanceof TsQueryAliasReference) {
			query = this.query.aliasName;
		} else {
			query = this.query.resolve();
		}
		return `ts_rank_cd(${textsearch}, ${query})`;
	}
}

export function ts_rank_cd(
	textsearch: ToTsVectorFunction | TsVectorAliasReference,
	query: ToTsQueryFunction | TsQueryAliasReference
): TsRankCdFunction {
	return new TsRankCdFunction(textsearch, query);
}
