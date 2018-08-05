import { AliasReference } from '../definitions/alias-reference';
import { ColumnDefinition } from '../definitions/column-definition';
import { ComparisonOperator } from '../operators/comparison/comparison-operator';
import { LogicalOperator } from '../operators/logical/logical-operator';
import { QueryResolution } from '../resolvable';
import { FromQueryBuilder } from './from';
import { OrderByQueryBuilder, OrderDirection } from './order';
import { QueryBuilder, QueryConfig, ToSQLConfig } from './query';

export class WhereQueryBuilder extends QueryBuilder {
	constructor(private parentQueryBuilder: FromQueryBuilder, private condition: LogicalOperator | ComparisonOperator) {
		super();
	}

	public orderBy(
		...orders: Array<ColumnDefinition | [ColumnDefinition | AliasReference, OrderDirection]>
	): OrderByQueryBuilder {
		return new OrderByQueryBuilder(this, ...orders);
	}

	public toQuery({ pretty = false, semicolon = false }: ToSQLConfig = {}): QueryConfig {
		const prettyBreak: string = pretty ? '\n' : ' ';
		const parentQueryConfig: QueryConfig = this.parentQueryBuilder.toQuery({ pretty, semicolon: false });
		let values: any[] = parentQueryConfig.values || [];
		let valueIndex: number = values.length + 1;
		let sql: string = parentQueryConfig.text;
		sql += prettyBreak;
		sql += 'WHERE ';
		const queryResolve: QueryResolution = this.condition.resolveQuery(valueIndex, values);
		const condition: string = queryResolve.text;
		values = queryResolve.values;
		valueIndex = queryResolve.valueIndex;
		if (pretty) {
			sql += condition.split(' AND').join('\n  AND');
		} else {
			sql += condition;
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
		const prettyBreak: string = pretty ? '\n' : ' ';
		let sql: string = this.parentQueryBuilder.toSQL({ pretty, semicolon: false });
		sql += prettyBreak;
		sql += 'WHERE ';
		const condition: string = this.condition.resolve();
		if (pretty) {
			sql += condition.split(' AND').join('\n  AND');
		} else {
			sql += condition;
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
