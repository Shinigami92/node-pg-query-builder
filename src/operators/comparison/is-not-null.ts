export class IsNotNullComparisonOperator {
	public static isNotNull(column: string): IsNotNullComparisonOperator {
		return new IsNotNullComparisonOperator(column);
	}

	constructor(public readonly column: string) {}

	public resolve(): string {
		return `${this.column} IS NOT NULL`;
	}
}
