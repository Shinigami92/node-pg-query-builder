import { ComparisonOperator } from './comparison-operator';

export class InComparisonOperator extends ComparisonOperator {
	public static in(column: string, values: ReadonlyArray<string | number>): InComparisonOperator {
		return new InComparisonOperator(column, values);
	}

	constructor(public readonly column: string, public readonly values: ReadonlyArray<string | number>) {
		super();
	}

	public resolve(): string {
		return `${this.column} IN (${this.values.join(', ')})`;
	}
}
