export abstract class QueryBuilder {
	public abstract toSQL({ pretty, semicolon }: { pretty?: boolean; semicolon?: boolean }): string;
}

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

export class WhereQueryBuilder extends QueryBuilder {
	constructor(private fromQueryBuilder: FromQueryBuilder, private condition: string) {
		super();
	}

	public orderBy(orders: Array<string | Order>): OrderByQueryBuilder {
		return new OrderByQueryBuilder(this, orders);
	}

	public toSQL({
		pretty = false,
		semicolon = false
	}: {
		pretty?: boolean | undefined;
		semicolon?: boolean | undefined;
	}): string {
		const prettyBreak: string = pretty ? '\n' : ' ';
		let sql: string = this.fromQueryBuilder.toSQL({ pretty, semicolon: false });
		sql += prettyBreak;
		sql += 'WHERE ';
		if (pretty) {
			sql += this.condition.split(' AND').join('\n  AND');
		} else {
			sql += this.condition;
		}
		if (semicolon) {
			sql += ';';
		}
		return sql;
	}
}

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

export interface Aliasable {
	[alias: string]: string;
}

export class SelectQueryBuilder {
	public selects: string[] = [];

	constructor(selections: string | Array<string | Aliasable>) {
		if (typeof selections === 'string') {
			this.selects = [selections];
		} else {
			this.selects = selections.map((selection: string | Aliasable) => {
				if (typeof selection === 'string') {
					return selection;
				}
				for (const alias in selection) {
					if (selection.hasOwnProperty(alias)) {
						return `${selection[alias]} AS ${alias}`;
					}
				}
				return '';
			});
		}
	}
	public from(tableName: string | Aliasable): FromQueryBuilder {
		return new FromQueryBuilder(this, tableName);
	}
}

export function select(selections: string | Array<string | Aliasable>): SelectQueryBuilder {
	return new SelectQueryBuilder(selections);
}
