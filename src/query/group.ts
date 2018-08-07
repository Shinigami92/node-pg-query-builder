import { AliasReference } from '../definitions/alias-reference';
import { ColumnDefinition } from '../definitions/column-definition';
import { FromQueryBuilder } from './from';
import { OrderByQueryBuilder, OrderDirection } from './order';
import { QueryBuilder, QueryConfig, ToSQLConfig } from './query';

export class GroupByQueryBuilder extends QueryBuilder {
	private readonly groupings: ColumnDefinition[] = [];

	constructor(private readonly parentQueryBuilder: FromQueryBuilder, ...groupings: ColumnDefinition[]) {
		super();
		this.groupings.push(...groupings);
	}

	public orderBy(
		...orders: Array<ColumnDefinition | [ColumnDefinition | AliasReference, OrderDirection]>
	): OrderByQueryBuilder {
		return new OrderByQueryBuilder(this, ...orders);
	}

	public toQuery({ pretty = false, semicolon = false }: ToSQLConfig = {}): QueryConfig {
		const prettyOrders: string = pretty ? ',\n         ' : ', ';
		const prettyBreak: string = pretty ? '\n' : ' ';
		const parentQueryConfig: QueryConfig = this.parentQueryBuilder.toQuery({ pretty, semicolon: false });
		const values: any[] = parentQueryConfig.values || [];
		let sql: string = parentQueryConfig.text;
		sql += prettyBreak;
		sql += 'GROUP BY ';
		sql += this.groupings.map((group: ColumnDefinition) => group.name).join(prettyOrders);
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
		const prettyOrders: string = pretty ? ',\n         ' : ', ';
		const prettyBreak: string = pretty ? '\n' : ' ';
		let sql: string = this.parentQueryBuilder.toSQL({ pretty, semicolon: false });
		sql += prettyBreak;
		sql += 'GROUP BY ';
		sql += this.groupings.map((group: ColumnDefinition) => group.name).join(prettyOrders);
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
