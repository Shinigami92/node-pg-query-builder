import { ColumnDefinition } from '../../definitions/column-definition';
import { QueryResolution } from '../../resolvable';
import { ComparisonOperator } from './comparison-operator';

export class LikeComparisonOperator extends ComparisonOperator {
	constructor(public readonly column: ColumnDefinition, public readonly value: string) {
		super();
	}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		return {
			text: `${this.column.name} LIKE $1`,
			valueIndex: 2,
			values: [this.value]
		};
	}

	public resolve(): string {
		return `${this.column.name} LIKE '${this.value}'`;
	}
}

export function like(column: ColumnDefinition, value: string): LikeComparisonOperator {
	return new LikeComparisonOperator(column, value);
}
