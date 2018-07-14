import { ColumnDefinition } from '../../definitions';
import { ComparisonOperator } from './comparison-operator';

export class IsNullComparisonOperator extends ComparisonOperator {
	constructor(public readonly column: ColumnDefinition) {
		super();
	}

	public resolve(): string {
		return `${this.column.name} IS NULL`;
	}
}

export function isNull(column: ColumnDefinition): IsNullComparisonOperator {
	return new IsNullComparisonOperator(column);
}
