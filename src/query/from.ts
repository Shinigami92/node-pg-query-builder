import { Aliasable, QueryBuilder } from '../select';
import { SelectQueryBuilder } from './select';
import { WhereQueryBuilder } from './where';

export enum JoinType {
	CROSS_JOIN
}

export interface Join {
	tableName: string;
	alias: string;
	type: JoinType;
}

export class FromQueryBuilder extends QueryBuilder {
	private joins: Join[] = [];

	constructor(private selectQueryBuilder: SelectQueryBuilder, private fromClause: string | Aliasable) {
		super();
	}

	public crossJoin(tableName: string, alias: string): this {
		this.joins.push({
			tableName,
			alias,
			type: JoinType.CROSS_JOIN
		});
		return this;
	}

	public where(value: string): WhereQueryBuilder {
		return new WhereQueryBuilder(this, value);
	}

	public toSQL({ pretty = false, semicolon = false }: { pretty?: boolean; semicolon?: boolean } = {}): string {
		const prettySelection: string = pretty ? ',\n       ' : ', ';
		const prettyBreak: string = pretty ? '\n' : ' ';
		let sql: string = '';
		sql += `SELECT ${this.selectQueryBuilder.selects.join(prettySelection)}`;
		sql += prettyBreak;
		sql += `FROM `;
		if (typeof this.fromClause === 'string') {
			sql += this.fromClause;
		} else {
			for (const alias in this.fromClause) {
				if (this.fromClause.hasOwnProperty(alias)) {
					sql += `${this.fromClause[alias]} AS ${alias}`;
					break;
				}
			}
		}
		if (this.joins.length > 0) {
			sql += prettyBreak;
			sql += this.joins
				.map((join: Join) => {
					switch (join.type) {
						case JoinType.CROSS_JOIN:
							return `CROSS JOIN ${join.tableName} AS ${join.alias}`;
					}
				})
				.join(prettyBreak);
		}
		if (semicolon) {
			sql += ';';
		}
		return sql;
	}
}
