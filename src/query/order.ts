import { QueryBuilder, ToSQLConfig } from './query';
import { WhereQueryBuilder } from './where';

export interface Order {
	[column: string]: 'ASC' | 'DESC' | null;
}

export class OrderByQueryBuilder extends QueryBuilder {
	constructor(private whereQueryBuilder: WhereQueryBuilder, private orders: Array<string | Order>) {
		super();
	}

	public toSQL({ pretty = false, semicolon = false }: ToSQLConfig = {}): string {
		const prettyOrders: string = pretty ? ',\n         ' : ', ';
		const prettyBreak: string = pretty ? '\n' : ' ';
		let sql: string = this.whereQueryBuilder.toSQL({ pretty, semicolon: false });
		sql += prettyBreak;
		sql += 'ORDER BY ';
		sql += this.orders
			.map((order: string | Order) => {
				if (typeof order === 'string') {
					return order;
				} else {
					for (const column in order) {
						if (order.hasOwnProperty(column)) {
							let stmt: string = column;
							if (order[column] !== null) {
								stmt += ` ${order[column]}`;
							}
							return stmt;
						}
					}
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
