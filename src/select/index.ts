import { SelectQueryBuilder } from '../query/select';

export abstract class QueryBuilder {
	public abstract toSQL({ pretty, semicolon }?: { pretty?: boolean; semicolon?: boolean }): string;
}

export interface Aliasable {
	[alias: string]: string;
}

export function select(selections: string | Array<string | Aliasable>): SelectQueryBuilder {
	return new SelectQueryBuilder(selections);
}
