import { Cast } from '../../data-types/cast';
import { ColumnDefinition } from '../../definitions/column-definition';
import { ComparisonOperator } from './comparison-operator';

export class EqualsComparisonOperator extends ComparisonOperator {
	public static eq(
		leftValue: ColumnDefinition | string | number | Cast,
		rightValue: ColumnDefinition | string | number | Cast
	): EqualsComparisonOperator {
		return new EqualsComparisonOperator(leftValue, rightValue);
	}

	constructor(
		public readonly leftValue: ColumnDefinition | string | number | Cast,
		public readonly rightValue: ColumnDefinition | string | number | Cast
	) {
		super();
	}

	public resolve(): string {
		return `${this.resolveValue(this.leftValue)} = ${this.resolveValue(this.rightValue)}`;
	}

	private resolveValue(value: ColumnDefinition | string | number | Cast): string {
		if (value instanceof Cast) {
			return value.resolve();
		} else if (value instanceof ColumnDefinition) {
			return value.name;
		} else if (typeof value === 'string') {
			//TODO: escape string
			return `'${value}'`;
		} else {
			return `${value}`;
		}
	}
}
