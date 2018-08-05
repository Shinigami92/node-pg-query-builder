import { ColumnDefinition } from '../../definitions/column-definition';
import { QueryResolution } from '../../resolvable';
import { AggregateFunction } from './aggregate-function';

export class AvgFunction extends AggregateFunction {
	constructor(public readonly expression: ColumnDefinition) {
		super();
	}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		throw new Error('Method not implemented.');
	}

	public resolve(): string {
		return `avg(${this.expression.name})`;
	}
}

export function avg(expression: ColumnDefinition): AvgFunction {
	return new AvgFunction(expression);
}
