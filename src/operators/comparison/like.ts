import { ColumnDefinition } from '../../definitions/column-definition';
import { ComparisonOperator } from './comparison-operator';

export class LikeComparisonOperator extends ComparisonOperator {
	public static like(column: ColumnDefinition, value: string): LikeComparisonOperator {
		return new LikeComparisonOperator(column, value);
	}

	constructor(public readonly column: ColumnDefinition, public readonly value: string) {
		super();
	}

	public resolve(): string {
		return `${this.column.name} LIKE '${this.value}'`;
	}
}
