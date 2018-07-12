import { ComparisonOperator } from '../operators/comparison/comparison-operator';
import { LogicalOperator } from '../operators/logical/logical-operator';
import { FromQueryBuilder } from './from';
import { Order, OrderByQueryBuilder } from './order';
import { QueryBuilder, ToSQLConfig } from './query';

export class WhereQueryBuilder extends QueryBuilder {
	constructor(private fromQueryBuilder: FromQueryBuilder, private condition: LogicalOperator | ComparisonOperator) {
		super();
	}

	public orderBy(orders: Array<string | Order>): OrderByQueryBuilder {
		return new OrderByQueryBuilder(this, orders);
	}

	public toSQL({ pretty = false, semicolon = false }: ToSQLConfig = {}): string {
		const prettyBreak: string = pretty ? '\n' : ' ';
		let sql: string = this.fromQueryBuilder.toSQL({ pretty, semicolon: false });
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
