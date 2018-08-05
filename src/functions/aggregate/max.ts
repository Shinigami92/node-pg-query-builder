import { ColumnDefinition } from '../../definitions/column-definition';
import { QueryResolution } from '../../resolvable';
import { AggregateFunction } from './aggregate-function';

export class MaxFunction extends AggregateFunction {
	constructor(public readonly expression: ColumnDefinition) {
		super();
	}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		throw new Error('Method not implemented.');
	}

	public resolve(): string {
		return `max(${this.expression.name})`;
	}
}

export function max(expression: ColumnDefinition): MaxFunction {
	return new MaxFunction(expression);
}
