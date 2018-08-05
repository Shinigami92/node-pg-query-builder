import { AliasReference } from '../definitions/alias-reference';
import { ColumnDefinition } from '../definitions/column-definition';
import { TableDefinition } from '../definitions/table-definition';
import { ToTsQueryFunction } from '../functions/text-search/to-tsquery';
import { ToTsVectorFunction } from '../functions/text-search/to-tsvector';
import { TsRankCdFunction } from '../functions/text-search/ts-rank-cd';
import { ComparisonOperator } from '../operators/comparison/comparison-operator';
import { LogicalOperator } from '../operators/logical/logical-operator';
import { isResolvable, QueryResolution } from '../resolvable';
import { QueryBuilder, QueryConfig, ToSQLConfig } from './query';
import { SelectQueryBuilder } from './select';
import { WhereQueryBuilder } from './where';

export enum JoinType {
	CROSS_JOIN
}

export interface Join {
	tableName: string | ToTsQueryFunction | ToTsVectorFunction;
	alias: AliasReference;
	type: JoinType;
}

export class FromQueryBuilder extends QueryBuilder {
	private joins: Join[] = [];

	constructor(private selectQueryBuilder: SelectQueryBuilder, private fromClause: TableDefinition) {
		super();
	}

	public crossJoin(tableName: string | ToTsQueryFunction | ToTsVectorFunction, alias: AliasReference): this {
		this.joins.push({ tableName, alias, type: JoinType.CROSS_JOIN });
		return this;
	}

	public where(condition: LogicalOperator | ComparisonOperator): WhereQueryBuilder {
		return new WhereQueryBuilder(this, condition);
	}

	public toQuery({ pretty = false, semicolon = false }: ToSQLConfig = {}): QueryConfig {
		const prettySelection: string = pretty ? ',\n       ' : ', ';
		const prettyBreak: string = pretty ? '\n' : ' ';
		let values: any[] = [];
		let valueIndex: number = 1;
		let sql: string = '';
		sql += `SELECT ${this.selectQueryBuilder.selects
			.map(
				(
					select:
						| ColumnDefinition
						| [string | number | boolean | TsRankCdFunction, AliasReference | undefined]
				) => {
					if (select instanceof ColumnDefinition) {
						return select.name;
					} else {
						const value: string | number | boolean | TsRankCdFunction = select[0];
						const alias: AliasReference | undefined = select[1];
						let stmt: string = '';
						if (isResolvable(value)) {
							stmt = value.resolve();
						} else {
							stmt = `$${valueIndex++}`;
							values.push(value);
						}
						if (alias !== undefined) {
							stmt += ` AS ${alias.aliasName}`;
						}
						return stmt;
					}
				}
			)
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
					let tableName: string;
					if (isResolvable(join.tableName)) {
						const resolution: QueryResolution = join.tableName.resolveQuery(valueIndex, values);
						tableName = resolution.text;
						valueIndex = resolution.valueIndex;
						values = [...resolution.values];
					} else {
						tableName = join.tableName;
					}
					switch (join.type) {
						case JoinType.CROSS_JOIN:
							return `CROSS JOIN ${tableName} AS ${join.alias.aliasName}`;
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
		const queryConfig: QueryConfig = {
			text: sql
		};
		if (values.length > 0) {
			queryConfig.values = values;
		}
		return queryConfig;
	}

	public toSQL({ pretty = false, semicolon = false }: ToSQLConfig = {}): string {
		const prettySelection: string = pretty ? ',\n       ' : ', ';
		const prettyBreak: string = pretty ? '\n' : ' ';
		let sql: string = '';
		sql += `SELECT ${this.selectQueryBuilder.selects
			.map(
				(
					select:
						| ColumnDefinition
						| [string | number | boolean | TsRankCdFunction, AliasReference | undefined]
				) => {
					if (select instanceof ColumnDefinition) {
						return select.name;
					} else {
						const value: string | number | boolean | TsRankCdFunction = select[0];
						const alias: AliasReference | undefined = select[1];
						let stmt: string = '';
						if (isResolvable(value)) {
							stmt = value.resolve();
						} else if (typeof value === 'string') {
							stmt = value;
						} else {
							stmt = `${value}`;
						}
						if (alias !== undefined) {
							stmt += ` AS ${alias.aliasName}`;
						}
						return stmt;
					}
				}
			)
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
					let tableName: string;
					if (isResolvable(join.tableName)) {
						tableName = join.tableName.resolve();
					} else {
						tableName = join.tableName;
					}
					switch (join.type) {
						case JoinType.CROSS_JOIN:
							return `CROSS JOIN ${tableName} AS ${join.alias.aliasName}`;
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
