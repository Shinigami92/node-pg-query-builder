import { Cast } from '../../data-types/cast';
import { ColumnDefinition } from '../../definitions/column-definition';
import { ComparisonOperator } from './comparison-operator';

export class EqualsComparisonOperator extends ComparisonOperator {
	public static eq(column: ColumnDefinition, value: string | number | Cast): EqualsComparisonOperator {
		return new EqualsComparisonOperator(column, value);
	}

	constructor(public readonly column: ColumnDefinition, public readonly value: string | number | Cast) {
		super();
	}

	public resolve(): string {
		let value: string | number;
		if (this.value instanceof Cast) {
			value = this.value.resolve();
		} else if (typeof this.value === 'string') {
			value = `'${this.value}'`;
		} else {
			value = this.value;
		}
		return `${this.column.name} = ${value}`;
	}
}
