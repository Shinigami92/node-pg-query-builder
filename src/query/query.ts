export interface Aliasable {
	[alias: string]: string;
}

export interface ToSQLConfig {
	pretty?: boolean;
	semicolon?: boolean;
}

export abstract class QueryBuilder {
	public abstract toSQL(config?: ToSQLConfig): string;
}
