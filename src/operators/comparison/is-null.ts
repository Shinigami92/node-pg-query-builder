import { ColumnDefinition } from '../../definitions';
import { QueryResolution } from '../../resolvable';
import { ComparisonPredicate } from './comparison-predicate';

export class IsNullComparisonPredicate extends ComparisonPredicate {
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

export function isNull(column: ColumnDefinition): IsNullComparisonPredicate {
	return new IsNullComparisonPredicate(column);
}
