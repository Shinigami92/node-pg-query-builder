import { QueryBuilder } from '../../query/query';
import { ComparisonOperator } from './comparison-operator';

export class GreaterEqualComparisonOperator extends ComparisonOperator {
	public static ge(column: string, value: string | number | QueryBuilder): GreaterEqualComparisonOperator {
		return new GreaterEqualComparisonOperator(column, value);
	}

	constructor(public readonly column: string, public readonly value: string | number | QueryBuilder) {
		super();
	}

	public resolve(): string {
		let value: string | number;
		if (this.value instanceof QueryBuilder) {
			value = `(${this.value.toSQL({ semicolon: false })})`;
		} else {
			value = this.value;
		}
		return `${this.column} >= ${value}`;
	}
}
