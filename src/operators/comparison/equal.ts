import { Cast } from '../../data-types/cast';
import { ComparisonOperator } from './comparison-operator';

export class EqualsComparisonOperator extends ComparisonOperator {
	public static eq(column: string, value: string | number | Cast): EqualsComparisonOperator {
		return new EqualsComparisonOperator(column, value);
	}

	constructor(public readonly column: string, public readonly value: string | number | Cast) {
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
		return `${this.column} = ${value}`;
	}
}
