import { TsRankCdFunction } from '../functions/text-search/ts-rank-cd';

export interface Aliasable {
	[alias: string]: string | TsRankCdFunction;
}

export interface ToSQLConfig {
	pretty?: boolean;
	semicolon?: boolean;
}

export abstract class QueryBuilder {
	protected _limit: number | null = null;
	protected _offset: number | null = null;

	public limit(limit: number): this {
		this._limit = limit;
		return this;
	}

	public offset(offset: number): this {
		this._offset = offset;
		return this;
	}

	public abstract toSQL(config?: ToSQLConfig): string;
}
