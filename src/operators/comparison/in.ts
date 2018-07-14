import { ColumnDefinition } from '../../definitions/column-definition';
import { ComparisonOperator } from './comparison-operator';

export class InComparisonOperator extends ComparisonOperator {
	constructor(public readonly column: ColumnDefinition, public readonly values: ReadonlyArray<string | number>) {
		super();
	}

	public resolve(): string {
		return `${this.column.name} IN (${this.values.join(', ')})`;
	}
}

export function inList(column: ColumnDefinition, values: ReadonlyArray<string | number>): InComparisonOperator {
	return new InComparisonOperator(column, values);
}
