import { ColumnDefinition } from '../../definitions/column-definition';
import { ComparisonOperator } from './comparison-operator';

export class LikeComparisonOperator extends ComparisonOperator {
	constructor(public readonly column: ColumnDefinition, public readonly value: string) {
		super();
	}

	public resolve(): string {
		return `${this.column.name} LIKE '${this.value}'`;
	}
}

export function like(column: ColumnDefinition, value: string): LikeComparisonOperator {
	return new LikeComparisonOperator(column, value);
}
