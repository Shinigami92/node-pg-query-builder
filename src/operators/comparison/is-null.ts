import { ColumnDefinition } from '../../definitions';
import { QueryResolution } from '../../resolvable';
import { ComparisonOperator } from './comparison-operator';

export class IsNullComparisonOperator extends ComparisonOperator {
	constructor(public readonly column: ColumnDefinition) {
		super();
	}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		return {
			text: `${this.column.name} IS NULL`,
			valueIndex,
			values: [...values]
		};
	}

	public resolve(): string {
		return `${this.column.name} IS NULL`;
	}
}

export function isNull(column: ColumnDefinition): IsNullComparisonOperator {
	return new IsNullComparisonOperator(column);
}
