import { ColumnDefinition } from '../../definitions/column-definition';
import { QueryResolution } from '../../resolvable';
import { ComparisonOperator } from './comparison-operator';

export class IsNotNullComparisonOperator extends ComparisonOperator {
	constructor(public readonly column: ColumnDefinition) {
		super();
	}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		return {
			text: `${this.column.name} IS NOT NULL`,
			valueIndex,
			values: [...values]
		};
	}

	public resolve(): string {
		return `${this.column.name} IS NOT NULL`;
	}
}

export function isNotNull(column: ColumnDefinition): IsNotNullComparisonOperator {
	return new IsNotNullComparisonOperator(column);
}
