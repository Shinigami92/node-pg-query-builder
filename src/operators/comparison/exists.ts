import { QueryBuilder } from '../../query/query';
import { ComparisonOperator } from './comparison-operator';

export class ExistsComparisonOperator extends ComparisonOperator {
	constructor(public readonly subquery: string | QueryBuilder) {
		super();
	}

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

export function exists(subquery: string | QueryBuilder): ExistsComparisonOperator {
	return new ExistsComparisonOperator(subquery);
}
