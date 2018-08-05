import { ColumnDefinition } from '../../definitions/column-definition';
import { QueryResolution } from '../../resolvable';
import { AggregateFunction } from './aggregate-function';

export class MinFunction extends AggregateFunction {
	constructor(public readonly expression: ColumnDefinition) {
		super();
	}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		throw new Error('Method not implemented.');
	}

	public resolve(): string {
		return `min(${this.expression.name})`;
	}
}

export function min(expression: ColumnDefinition): MinFunction {
	return new MinFunction(expression);
}
