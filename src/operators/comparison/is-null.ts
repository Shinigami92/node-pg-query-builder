import { ComparisonOperator } from './comparison-operator';

export class IsNullComparisonOperator extends ComparisonOperator {
	public static isNull(column: string): IsNullComparisonOperator {
		return new IsNullComparisonOperator(column);
	}

	constructor(public readonly column: string) {
		super();
	}

	public resolve(): string {
		return `${this.column} IS NULL`;
	}
}
