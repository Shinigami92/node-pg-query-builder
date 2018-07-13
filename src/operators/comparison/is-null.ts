import { ColumnDefinition } from '../../definitions';
import { ComparisonOperator } from './comparison-operator';

export class IsNullComparisonOperator extends ComparisonOperator {
	public static isNull(column: ColumnDefinition): IsNullComparisonOperator {
		return new IsNullComparisonOperator(column);
	}

	constructor(public readonly column: ColumnDefinition) {
		super();
	}

	public resolve(): string {
		return `${this.column.name} IS NULL`;
	}
}
