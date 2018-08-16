import { ColumnDefinition } from '../../definitions/column-definition';
import { QueryResolution } from '../../resolvable';
import { ComparisonPredicate } from './comparison-predicate';

export class LikeComparisonPredicate extends ComparisonPredicate {
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

export function like(column: ColumnDefinition, value: string): LikeComparisonPredicate {
	return new LikeComparisonPredicate(column, value);
}
