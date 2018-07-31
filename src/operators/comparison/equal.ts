import { Cast } from '../../data-types/cast';
import { ColumnDefinition } from '../../definitions/column-definition';
import { QueryResolution } from '../../resolvable';
import { ComparisonOperator } from './comparison-operator';

export class EqualsComparisonOperator extends ComparisonOperator {
	constructor(
		public readonly leftValue: ColumnDefinition | string | number | Cast,
		public readonly rightValue: ColumnDefinition | string | number | Cast
	) {
		super();
	}

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
		} else {
			texts[1] = `${this.rightValue.name}`;
		}
		return {
			text: texts.join(' = '),
			valueIndex,
			values: [...values, ...innerValues]
		};
	}

	public resolve(): string {
		return `${this.resolveValue(this.leftValue)} = ${this.resolveValue(this.rightValue)}`;
	}

	private resolveValue(value: ColumnDefinition | string | number | Cast): string {
		if (value instanceof Cast) {
			return value.resolve();
		} else if (value instanceof ColumnDefinition) {
			return value.name;
		} else if (typeof value === 'string') {
			//TODO: escape string
			return `'${value}'`;
		} else {
			return `${value}`;
		}
	}
}

export function eq(
	leftValue: string | number | ColumnDefinition | Cast,
	rightValue: string | number | ColumnDefinition | Cast
): EqualsComparisonOperator {
	return new EqualsComparisonOperator(leftValue, rightValue);
}
