import { QueryBuilder } from '.';
import { FromQueryBuilder } from './from';
import { Order, OrderByQueryBuilder } from './order';

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
