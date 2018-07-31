import { ColumnDefinition } from '../../definitions/column-definition';
import { QueryResolution } from '../../resolvable';
import { ComparisonOperator } from './comparison-operator';

export class InComparisonOperator extends ComparisonOperator {
	constructor(public readonly column: ColumnDefinition, public readonly values: ReadonlyArray<string | number>) {
		super();
	}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		return {
			text: `${this.column.name} IN (${this.values.map((_: string | number) => `$${valueIndex++}`).join(', ')})`,
			valueIndex,
			values: [...values, ...this.values]
		};
	}

	public resolve(): string {
		return `${this.column.name} IN (${this.values.join(', ')})`;
	}
}

export function inList(column: ColumnDefinition, values: ReadonlyArray<string | number>): InComparisonOperator {
	return new InComparisonOperator(column, values);
}
