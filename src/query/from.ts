import { Cast } from '../data-types/cast';
import { AliasReference } from '../definitions/alias-reference';
import { ColumnDefinition } from '../definitions/column-definition';
import { TableDefinition } from '../definitions/table-definition';
import { AggregateFunction } from '../functions/aggregate/aggregate-function';
import { ToTsQueryFunction } from '../functions/text-search/to-tsquery';
import { ToTsVectorFunction } from '../functions/text-search/to-tsvector';
import { TsRankCdFunction } from '../functions/text-search/ts-rank-cd';
import { CrossJoin } from '../joins/cross';
import { InnerJoin } from '../joins/inner';
import { Join } from '../joins/join';
import { ComparisonOperator } from '../operators/comparison/comparison-operator';
import { EqualsComparisonOperator } from '../operators/comparison/equal';
import { LogicalOperator } from '../operators/logical/logical-operator';
import { isResolvable, QueryResolution } from '../resolvable';
import { GroupByQueryBuilder } from './group';
import { QueryBuilder, QueryConfig, ToSQLConfig } from './query';
import { SelectQueryBuilder } from './select';
import { WhereQueryBuilder } from './where';

export class FromQueryBuilder extends QueryBuilder {
	private joins: Join[] = [];

	constructor(private parentQueryBuilder: SelectQueryBuilder, private fromClause: TableDefinition) {
		super();
	}

	public join(tableDefinition: TableDefinition, onExpression: EqualsComparisonOperator): this {
		this.joins.push(new InnerJoin(tableDefinition, onExpression));
		return this;
	}

	public crossJoin(tableName: string | ToTsQueryFunction | ToTsVectorFunction, alias: AliasReference): this {
		this.joins.push(new CrossJoin(tableName, alias));
		return this;
	}

	public groupBy(...groupings: ColumnDefinition[]): GroupByQueryBuilder {
		return new GroupByQueryBuilder(this, ...groupings);
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
		sql += `SELECT ${this.parentQueryBuilder.selects
			.map(
				(
					select:
						| ColumnDefinition
						| [

									| string
									| number
									| boolean
									| ColumnDefinition
									| AggregateFunction
									| Cast
									| TsRankCdFunction,
								AliasReference | undefined
						  ]
				) => {
					if (select instanceof ColumnDefinition) {
						return select.name;
					} else {
						const value:
							| string
							| number
							| boolean
							| ColumnDefinition
							| AggregateFunction
							| Cast
							| TsRankCdFunction =
							select[0];
						const alias: AliasReference | undefined = select[1];
						let stmt: string = '';
						if (isResolvable(value)) {
							const resolution: QueryResolution = value.resolveQuery(valueIndex, values);
							valueIndex = resolution.valueIndex;
							values = [...resolution.values];
							stmt = resolution.text;
						} else if (value instanceof ColumnDefinition) {
							stmt = value.name;
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
					const resolution: QueryResolution = join.resolveQuery(valueIndex, values);
					valueIndex = resolution.valueIndex;
					values = [...resolution.values];
					return resolution.text;
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
		sql += `SELECT ${this.parentQueryBuilder.selects
			.map(
				(
					select:
						| ColumnDefinition
						| [

									| string
									| number
									| boolean
									| ColumnDefinition
									| AggregateFunction
									| Cast
									| TsRankCdFunction,
								AliasReference | undefined
						  ]
				) => {
					if (select instanceof ColumnDefinition) {
						return select.name;
					} else {
						const value:
							| string
							| number
							| boolean
							| ColumnDefinition
							| AggregateFunction
							| Cast
							| TsRankCdFunction =
							select[0];
						const alias: AliasReference | undefined = select[1];
						let stmt: string = '';
						if (isResolvable(value)) {
							stmt = value.resolve();
						} else if (typeof value === 'number' || typeof value === 'boolean') {
							stmt = `${value}`;
						} else if (value instanceof ColumnDefinition) {
							stmt = value.name;
						} else {
							stmt = value;
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
			sql += this.joins.map((join: Join) => join.resolve()).join(prettyBreak);
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
