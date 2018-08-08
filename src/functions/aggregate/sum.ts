import { ColumnDefinition } from '../../definitions/column-definition';
import { QueryResolution } from '../../resolvable';
import { AggregateFunction } from './aggregate-function';

export class SumFunction extends AggregateFunction {
	constructor(public readonly expression: ColumnDefinition) {
		super();
	}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		const text: string = this.expression.name;
		return {
			text: `sum(${text})`,
			valueIndex,
			values: [...values]
		};
	}

	public resolve(): string {
		return `sum(${this.expression.name})`;
	}
}

export function sum(expression: ColumnDefinition): SumFunction {
	return new SumFunction(expression);
}
