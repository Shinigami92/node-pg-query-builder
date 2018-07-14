import { ColumnDefinition } from '../../definitions/column-definition';
import { ComparisonOperator } from './comparison-operator';

export class IsNotNullComparisonOperator extends ComparisonOperator {
	constructor(public readonly column: ColumnDefinition) {
		super();
	}

	public resolve(): string {
		return `${this.column.name} IS NOT NULL`;
	}
}

export function isNotNull(column: ColumnDefinition): IsNotNullComparisonOperator {
	return new IsNotNullComparisonOperator(column);
}
