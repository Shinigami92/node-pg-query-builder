import { ComparisonOperator } from './comparison-operator';

export class NotInComparisonOperator extends ComparisonOperator {
	public static notIn(column: string, values: ReadonlyArray<string | number>): NotInComparisonOperator {
		return new NotInComparisonOperator(column, values);
	}

	constructor(public readonly column: string, public readonly values: ReadonlyArray<string | number>) {
		super();
	}

	public resolve(): string {
		return `${this.column} NOT IN (${this.values.join(', ')})`;
	}
}
