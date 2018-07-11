import { ComparisonOperator } from './comparison-operator';

export class EqualsComparisonOperator extends ComparisonOperator {
	public static eq(column: string, value: string | number): EqualsComparisonOperator {
		return new EqualsComparisonOperator(column, value);
	}

	constructor(public readonly column: string, public readonly value: string | number) {
		super();
	}

	public resolve(): string {
		return `${this.column} = ${this.value}`;
	}
}
