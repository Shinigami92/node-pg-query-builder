import { ColumnDefinition } from '../../definitions/column-definition';
import { ComparisonOperator } from './comparison-operator';

export class NotInComparisonOperator extends ComparisonOperator {
	constructor(public readonly column: ColumnDefinition, public readonly values: ReadonlyArray<string | number>) {
		super();
	}

	public resolve(): string {
		return `${this.column.name} NOT IN (${this.values.join(', ')})`;
	}
}

export function notInList(column: ColumnDefinition, values: ReadonlyArray<string | number>): NotInComparisonOperator {
	return new NotInComparisonOperator(column, values);
}
