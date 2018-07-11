import { TsRankCdFunction } from '../functions/text-search/ts-rank-cd';

export interface Aliasable {
	[alias: string]: string | TsRankCdFunction;
}

export interface ToSQLConfig {
	pretty?: boolean;
	semicolon?: boolean;
}

export abstract class QueryBuilder {
	public abstract toSQL(config?: ToSQLConfig): string;
}
