export class IsNullComparisonOperator {
	public static isNull(column: string): IsNullComparisonOperator {
		return new IsNullComparisonOperator(column);
	}

	constructor(public readonly column: string) {}

	public resolve(): string {
		return `${this.column} IS NULL`;
	}
}
