import { ColumnDefinition } from '../../definitions/column-definition';
import { ComparisonOperator } from './comparison-operator';

export class IsNotNullComparisonOperator extends ComparisonOperator {
	public static isNotNull(column: ColumnDefinition): IsNotNullComparisonOperator {
		return new IsNotNullComparisonOperator(column);
	}

	constructor(public readonly column: ColumnDefinition) {
		super();
	}

	public resolve(): string {
		return `${this.column.name} IS NOT NULL`;
	}
}
