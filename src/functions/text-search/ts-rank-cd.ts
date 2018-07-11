export class TsRankCdFunction {
	public static ts_rank_cd(textsearch: 'textsearch', query: 'query'): TsRankCdFunction {
		return new TsRankCdFunction(textsearch, query);
	}

	constructor(public readonly textsearch: 'textsearch', public readonly query: 'query') {}

	public resolve(): string {
		return `ts_rank_cd('${this.textsearch}', '${this.query}')`;
	}
}
