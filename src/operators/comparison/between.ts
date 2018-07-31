import { ColumnDefinition } from '../../definitions/column-definition';
import { QueryResolution } from '../../resolvable';
import { ComparisonOperator } from './comparison-operator';

export class BetweenComparisonOperator extends ComparisonOperator {
	constructor(column: ColumnDefinition, x: number, y: number);
	constructor(column: ColumnDefinition, x: string, y: string);
	constructor(
		public readonly column: ColumnDefinition,
		public readonly x: string | number,
		public readonly y: string | number
	) {
		super();
	}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		return {
			text: `${this.column.name} BETWEEN $${valueIndex++} AND $${valueIndex++}`,
			valueIndex,
			values: [...values, this.x, this.y]
		};
	}

	public resolve(): string {
		if (typeof this.x === 'number') {
			return `${this.column.name} BETWEEN ${this.x} AND ${this.y}`;
		}
		return `${this.column.name} BETWEEN '${this.x}' AND '${this.y}'`;
	}
}

export function between(column: ColumnDefinition, x: number, y: number): BetweenComparisonOperator;
export function between(column: ColumnDefinition, x: string, y: string): BetweenComparisonOperator;
export function between(column: ColumnDefinition, x: any, y: any): BetweenComparisonOperator {
	return new BetweenComparisonOperator(column, x, y);
}
