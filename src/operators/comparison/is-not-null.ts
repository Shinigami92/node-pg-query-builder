import { ColumnDefinition } from '../../definitions/column-definition';
import { QueryResolution } from '../../resolvable';
import { ComparisonPredicate } from './comparison-predicate';

export class IsNotNullComparisonPredicate extends ComparisonPredicate {
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

export function isNotNull(column: ColumnDefinition): IsNotNullComparisonPredicate {
	return new IsNotNullComparisonPredicate(column);
}
