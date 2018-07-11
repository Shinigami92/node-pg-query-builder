import { QueryBuilder } from '../../query/query';
import { ComparisonOperator } from './comparison-operator';

export class GreaterThanComparisonOperator extends ComparisonOperator {
	public static gt(column: string, value: string | number | QueryBuilder): GreaterThanComparisonOperator {
		return new GreaterThanComparisonOperator(column, value);
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
		return `${this.column} > ${value}`;
	}
}
