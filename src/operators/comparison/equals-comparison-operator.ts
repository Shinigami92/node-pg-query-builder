export class EqualsComparisonOperator {
	public static eq(column: string, value: string | number): EqualsComparisonOperator {
		return new EqualsComparisonOperator(column, value);
	}

	constructor(public readonly column: string, public readonly value: string | number) {}

	public resolve(): string {
		return `${this.column} = ${this.value}`;
	}
}
