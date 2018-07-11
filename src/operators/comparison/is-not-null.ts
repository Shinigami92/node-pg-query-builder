import { ComparisonOperator } from './comparison-operator';

export class IsNotNullComparisonOperator extends ComparisonOperator {
	public static isNotNull(column: string): IsNotNullComparisonOperator {
		return new IsNotNullComparisonOperator(column);
	}

	constructor(public readonly column: string) {
		super();
	}

	public resolve(): string {
		return `${this.column} IS NOT NULL`;
	}
}
