import { QueryBuilder } from '../../query/query';

export class ExistsComparisonOperator {
	public static exists(subquery: string | QueryBuilder): ExistsComparisonOperator {
		return new ExistsComparisonOperator(subquery);
	}

	constructor(public readonly subquery: string | QueryBuilder) {}

	public resolve(): string {
		let subquery: string;
		if (this.subquery instanceof QueryBuilder) {
			subquery = this.subquery.toSQL({ semicolon: false });
		} else {
			subquery = this.subquery;
		}
		return `EXISTS (${subquery})`;
	}
}
