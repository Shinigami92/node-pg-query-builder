import { QueryBuilder, ToSQLConfig } from './query';

export interface SetMap {
	[column: string]: string | number;
}

export class UpdateWhereQueryBuilder extends QueryBuilder {
	private condition: string | null = null;
	constructor(private updateQueryBuilder: UpdateQueryBuilder) {
		super();
	}

	public where(condition: string): this {
		this.condition = condition;
		return this;
	}

	public toSQL({ pretty = false, semicolon = false }: ToSQLConfig = {}): string {
		// const prettySelection: string = pretty ? ',\n       ' : ', ';
		// const prettyBreak: string = pretty ? '\n' : ' ';
		let sql: string = this.updateQueryBuilder.toSQL({ pretty, semicolon: false });
		sql += ` WHERE ${this.condition}`;
		if (semicolon) {
			sql += ';';
		}
		return sql;
	}
}

export class UpdateQueryBuilder extends QueryBuilder {
	private setMap: SetMap | null = null;

	constructor(private tableName: string) {
		super();
	}

	public set(setMap: SetMap): UpdateWhereQueryBuilder {
		this.setMap = setMap;
		return new UpdateWhereQueryBuilder(this);
	}

	public toSQL({ pretty = false, semicolon = false }: ToSQLConfig = {}): string {
		// const prettySelection: string = pretty ? ',\n       ' : ', ';
		// const prettyBreak: string = pretty ? '\n' : ' ';
		let sql: string = `UPDATE ${this.tableName}`;
		sql += ' SET ';
		if (this.setMap !== null) {
			sql += Object.entries(this.setMap)
				.map((entry: [string, string | number]) => `${entry[0]} = ${entry[1]}`)
				.join(', ');
		} else {
			throw new Error('Please use UpdateQueryBuilder#set first');
		}
		if (semicolon) {
			sql += ';';
		}
		return sql;
	}
}
