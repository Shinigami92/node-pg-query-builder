import { QueryBuilder } from '../../query/query';

export class GreaterEqualComparisonOperator {
	public static ge(column: string, value: string | number | QueryBuilder): GreaterEqualComparisonOperator {
		return new GreaterEqualComparisonOperator(column, value);
	}

	constructor(public readonly column: string, public readonly value: string | number | QueryBuilder) {}

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
