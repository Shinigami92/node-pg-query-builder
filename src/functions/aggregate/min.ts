import { ColumnDefinition } from '../../definitions/column-definition';
import { QueryResolution } from '../../resolvable';
import { AggregateFunction } from './aggregate-function';

export class MinFunction extends AggregateFunction {
	constructor(public readonly expression: ColumnDefinition) {
		super();
	}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		const text: string = this.expression.name;
		return {
			text: `min(${text})`,
			valueIndex,
			values: [...values]
		};
	}

	public resolve(): string {
		return `min(${this.expression.name})`;
	}
}

export function min(expression: ColumnDefinition): MinFunction {
	return new MinFunction(expression);
}
