import { ComparisonOperator } from './comparison-operator';

export class LikeComparisonOperator extends ComparisonOperator {
	public static like(column: string, value: string): LikeComparisonOperator {
		return new LikeComparisonOperator(column, value);
	}

	constructor(public readonly column: string, public readonly value: string) {
		super();
	}

	public resolve(): string {
		return `${this.column} LIKE '${this.value}'`;
	}
}
