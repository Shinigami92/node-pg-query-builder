import { TextSearchFunction } from './text-search-function';

export class TsRankCdFunction extends TextSearchFunction {
	public static ts_rank_cd(textsearch: 'textsearch', query: 'query'): TsRankCdFunction {
		return new TsRankCdFunction(textsearch, query);
	}

	constructor(public readonly textsearch: 'textsearch', public readonly query: 'query') {
		super();
	}

	public resolve(): string {
		return `ts_rank_cd('${this.textsearch}', '${this.query}')`;
	}
}
