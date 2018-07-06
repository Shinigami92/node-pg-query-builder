import { QueryBuilder } from '.';
import { WhereQueryBuilder } from './where';

export interface Order {
	[column: string]: 'ASC' | 'DESC' | null;
}

export class OrderByQueryBuilder extends QueryBuilder {
	private _limit: number | null = null;
	private _offset: number | null = null;

	constructor(private whereQueryBuilder: WhereQueryBuilder, private orders: Array<string | Order>) {
		super();
	}

	public limit(limit: number): this {
		this._limit = limit;
		return this;
	}

	public offset(offset: number): this {
		this._offset = offset;
		return this;
	}

	public toSQL({
		pretty = false,
		semicolon = false
	}: {
		pretty?: boolean | undefined;
		semicolon?: boolean | undefined;
	}): string {
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
		sql += prettyBreak;
		sql += `LIMIT ${this._limit}`;
		sql += prettyBreak;
		sql += `OFFSET ${this._offset}`;
		if (semicolon) {
			sql += ';';
		}
		return sql;
	}
}
