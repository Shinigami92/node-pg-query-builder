import { Cast } from '../../data-types/cast';
import { ColumnDefinition } from '../../definitions/column-definition';
import { QueryBuilder, QueryConfig } from '../../query/query';
import { QueryableValue } from '../../queryable';
import { QueryResolution, Resolvable } from '../../resolvable';
import { Operator } from '../operator';

export abstract class ComparisonOperator implements Resolvable {
	constructor(
		public readonly leftValue: QueryableValue,
		public readonly rightValue: QueryableValue,
		protected readonly comparisonSymbol: Operator
	) {}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		const texts: [string, string] = ['', ''];
		const innerValues: any[] = [];

		if (typeof this.leftValue === 'string' || typeof this.leftValue === 'number') {
			texts[0] = `$${valueIndex++}`;
			innerValues.push(this.leftValue);
		} else if (this.leftValue instanceof Cast) {
			const resolution: QueryResolution = this.leftValue.resolveQuery(valueIndex, values);
			texts[0] = resolution.text;
			valueIndex = resolution.valueIndex;
			innerValues.push(...resolution.values);
		} else if (this.leftValue instanceof QueryBuilder) {
			const queryConfig: QueryConfig = this.leftValue.toQuery({ semicolon: false });
			const values: any[] = queryConfig.values || [];
			texts[0] = `(${queryConfig.text})`;
			valueIndex += values.length + 1;
			innerValues.push(...values);
		} else {
			texts[0] = `${this.leftValue.name}`;
		}

		if (typeof this.rightValue === 'string' || typeof this.rightValue === 'number') {
			texts[1] = `$${valueIndex++}`;
			innerValues.push(this.rightValue);
		} else if (this.rightValue instanceof Cast) {
			const resolution: QueryResolution = this.rightValue.resolveQuery(valueIndex, values);
			texts[1] = resolution.text;
			valueIndex = resolution.valueIndex;
			innerValues.push(...resolution.values);
		} else if (this.rightValue instanceof QueryBuilder) {
			const queryConfig: QueryConfig = this.rightValue.toQuery({ semicolon: false });
			const values: any[] = queryConfig.values || [];
			texts[1] = `(${queryConfig.text})`;
			valueIndex += values.length + 1;
			innerValues.push(...values);
		} else {
			texts[1] = `${this.rightValue.name}`;
		}

		return {
			text: texts.join(` ${this.comparisonSymbol} `),
			valueIndex,
			values: [...values, ...innerValues]
		};
	}

	public resolve(): string {
		return `${this.resolveQueryableValue(this.leftValue)} ${this.comparisonSymbol} ${this.resolveQueryableValue(
			this.rightValue
		)}`;
	}

	protected resolveQueryableValue(value: QueryableValue): string {
		if (value instanceof Cast) {
			return value.resolve();
		} else if (value instanceof ColumnDefinition) {
			return value.name;
		} else if (value instanceof QueryBuilder) {
			return `(${value.toSQL({ semicolon: false })})`;
		} else if (typeof value === 'string') {
			//TODO: escape string
			return `'${value}'`;
		} else {
			return `${value}`;
		}
	}
}
