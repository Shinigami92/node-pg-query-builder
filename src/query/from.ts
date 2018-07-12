import { ToTsQueryFunction } from '../functions/text-search/to-tsquery';
import { ToTsVectorFunction } from '../functions/text-search/to-tsvector';
import { ComparisonOperator } from '../operators/comparison/comparison-operator';
import { LogicalOperator } from '../operators/logical/logical-operator';
import { Aliasable, QueryBuilder, ToSQLConfig } from './query';
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

	public crossJoin(tableName: string | ToTsQueryFunction | ToTsVectorFunction, alias: string): this {
		if (tableName instanceof ToTsQueryFunction) {
			tableName = tableName.resolve();
		} else if (tableName instanceof ToTsVectorFunction) {
			tableName = tableName.resolve();
		}
		this.joins.push({
			tableName,
			alias,
			type: JoinType.CROSS_JOIN
		});
		return this;
	}

	public where(condition: LogicalOperator | ComparisonOperator): WhereQueryBuilder {
		return new WhereQueryBuilder(this, condition);
	}

	public toSQL({ pretty = false, semicolon = false }: ToSQLConfig = {}): string {
		const prettySelection: string = pretty ? ',\n       ' : ', ';
		const prettyBreak: string = pretty ? '\n' : ' ';
		let sql: string = '';
		sql += `SELECT ${this.selectQueryBuilder.selects.join(prettySelection)}`;
		sql += prettyBreak;
		sql += 'FROM ';
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
		if (this._limit !== null) {
			sql += prettyBreak;
			sql += `LIMIT ${this._limit}`;
		}
		if (this._offset !== null) {
			sql += prettyBreak;
			sql += `OFFSET ${this._offset}`;
		}
		if (semicolon) {
			sql += ';';
		}
		return sql;
	}
}
