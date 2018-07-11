export class LikeComparisonOperator {
	public static like(column: string, value: string): LikeComparisonOperator {
		return new LikeComparisonOperator(column, value);
	}

	constructor(public readonly column: string, public readonly value: string) {}

	public resolve(): string {
		return `${this.column} LIKE '${this.value}'`;
	}
}
