import { ColumnDefinition } from '../../definitions/column-definition';
import { QueryBuilder, QueryConfig } from '../../query/query';
import { QueryResolution } from '../../resolvable';
import { ComparisonOperator } from './comparison-operator';

export class GreaterEqualComparisonOperator extends ComparisonOperator {
	constructor(public readonly column: ColumnDefinition, public readonly value: string | number | QueryBuilder) {
		super();
	}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		if (this.value instanceof QueryBuilder) {
			const queryConfig: QueryConfig = this.value.toQuery({ semicolon: false });
			const values: any[] = queryConfig.values || [];
			return {
				text: `${this.column.name} >= (${queryConfig.text})`,
				valueIndex: valueIndex + values.length + 1,
				values
			};
		}
		return {
			text: `${this.column.name} >= $${valueIndex++}`,
			valueIndex,
			values: [...values, this.value]
		};
	}

	public resolve(): string {
		let value: string | number;
		if (this.value instanceof QueryBuilder) {
			value = `(${this.value.toSQL({ semicolon: false })})`;
		} else {
			value = this.value;
		}
		return `${this.column.name} >= ${value}`;
	}
}

export function ge(column: ColumnDefinition, value: string | number | QueryBuilder): GreaterEqualComparisonOperator {
	return new GreaterEqualComparisonOperator(column, value);
}
