import { ComparisonOperator } from './comparison-operator';

export class BetweenComparisonOperator extends ComparisonOperator {
	public static between(column: string, x: number, y: number): BetweenComparisonOperator;
	public static between(column: string, x: string, y: string): BetweenComparisonOperator;
	public static between(column: string, x: any, y: any): BetweenComparisonOperator {
		return new BetweenComparisonOperator(column, x, y);
	}

	constructor(column: string, x: number, y: number);
	constructor(column: string, x: string, y: string);
	constructor(
		public readonly column: string,
		public readonly x: string | number,
		public readonly y: string | number
	) {
		super();
	}

	public resolve(): string {
		if (typeof this.x === 'number') {
			return `${this.column} BETWEEN ${this.x} AND ${this.y}`;
		}
		return `${this.column} BETWEEN '${this.x}' AND '${this.y}'`;
	}
}
