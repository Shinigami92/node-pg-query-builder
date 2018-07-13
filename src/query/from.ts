import { AliasReference } from '../definitions/alias-reference';
import { ColumnDefinition } from '../definitions/column-definition';
import { TableDefinition } from '../definitions/table-definition';
import { ToTsQueryFunction } from '../functions/text-search/to-tsquery';
import { ToTsVectorFunction } from '../functions/text-search/to-tsvector';
import { TsRankCdFunction } from '../functions/text-search/ts-rank-cd';
import { ComparisonOperator } from '../operators/comparison/comparison-operator';
import { LogicalOperator } from '../operators/logical/logical-operator';
import { QueryBuilder, ToSQLConfig } from './query';
import { SelectQueryBuilder } from './select';
import { WhereQueryBuilder } from './where';

export enum JoinType {
	CROSS_JOIN
}

export interface Join {
	tableName: string;
	alias: AliasReference;
	type: JoinType;
}

export class FromQueryBuilder extends QueryBuilder {
	private joins: Join[] = [];

	constructor(private selectQueryBuilder: SelectQueryBuilder, private fromClause: TableDefinition) {
		super();
	}

	public crossJoin(tableName: string | ToTsQueryFunction | ToTsVectorFunction, alias: AliasReference): this {
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
		sql += `SELECT ${this.selectQueryBuilder.selects
			.map((select: ColumnDefinition | [string | TsRankCdFunction, AliasReference | undefined]) => {
				if (select instanceof ColumnDefinition) {
					return select.name;
				} else {
					const value: string | TsRankCdFunction = select[0];
					const alias: AliasReference | undefined = select[1];
					let stmt: string = '';
					if (typeof value === 'string') {
						stmt = value;
					} else {
						stmt = value.resolve();
					}
					if (alias !== undefined) {
						stmt += ` AS ${alias.aliasName}`;
					}
					return stmt;
				}
				return '';
			})
			.join(prettySelection)}`;
		sql += prettyBreak;
		sql += 'FROM ';
		sql += `${this.fromClause.tableName}`;
		if (this.fromClause.alias !== undefined) {
			sql += ` AS ${this.fromClause.alias.aliasName}`;
		}
		if (this.joins.length > 0) {
			sql += prettyBreak;
			sql += this.joins
				.map((join: Join) => {
					switch (join.type) {
						case JoinType.CROSS_JOIN:
							return `CROSS JOIN ${join.tableName} AS ${join.alias.aliasName}`;
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
