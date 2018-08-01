import { AliasReference } from '../definitions/alias-reference';
import { ColumnDefinition } from '../definitions/column-definition';
import { QueryBuilder, QueryConfig, ToSQLConfig } from './query';
import { WhereQueryBuilder } from './where';

export type OrderDirection = 'ASC' | 'DESC' | null;

export interface Order {
	[column: string]: OrderDirection;
}

export class OrderByQueryBuilder extends QueryBuilder {
	private readonly orders: Array<ColumnDefinition | [ColumnDefinition | AliasReference, OrderDirection]> = [];

	constructor(
		private readonly whereQueryBuilder: WhereQueryBuilder,
		...orders: Array<ColumnDefinition | [ColumnDefinition | AliasReference, OrderDirection]>
	) {
		super();
		this.orders.push(...orders);
	}

	public toQuery({ pretty = false, semicolon = false }: ToSQLConfig = {}): QueryConfig {
		const prettyOrders: string = pretty ? ',\n         ' : ', ';
		const prettyBreak: string = pretty ? '\n' : ' ';
		const whereQueryConfig: QueryConfig = this.whereQueryBuilder.toQuery({ pretty, semicolon: false });
		const values: any[] = whereQueryConfig.values || [];
		let sql: string = whereQueryConfig.text;
		sql += prettyBreak;
		sql += 'ORDER BY ';
		sql += this.orders
			.map((order: ColumnDefinition | [ColumnDefinition | AliasReference, OrderDirection]) => {
				if (order instanceof ColumnDefinition) {
					return `${order.name}`;
				} else {
					const link: ColumnDefinition | AliasReference = order[0];
					const direction: OrderDirection = order[1];
					let stmt: string = link instanceof ColumnDefinition ? link.name : link.aliasName;
					if (direction !== null) {
						stmt += ` ${direction}`;
					}
					return stmt;
				}
			})
			.join(prettyOrders);
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
		let sql: string = this.whereQueryBuilder.toSQL({ pretty, semicolon: false });
		sql += prettyBreak;
		sql += 'ORDER BY ';
		sql += this.orders
			.map((order: ColumnDefinition | [ColumnDefinition | AliasReference, OrderDirection]) => {
				if (order instanceof ColumnDefinition) {
					return `${order.name}`;
				} else {
					const link: ColumnDefinition | AliasReference = order[0];
					const direction: OrderDirection = order[1];
					let stmt: string = link instanceof ColumnDefinition ? link.name : link.aliasName;
					if (direction !== null) {
						stmt += ` ${direction}`;
					}
					return stmt;
				}
			})
			.join(prettyOrders);
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
