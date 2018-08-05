import { ColumnDefinition } from '../../definitions/column-definition';
import { QueryResolution } from '../../resolvable';
import { AggregateFunction } from './aggregate-function';

export class CountFunction extends AggregateFunction {
	constructor(public readonly expression: string | ColumnDefinition) {
		super();
	}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		throw new Error('Method not implemented.');
	}

	public resolve(): string {
		let text: string;
		if (this.expression instanceof ColumnDefinition) {
			text = this.expression.name;
		} else {
			text = `'${this.expression}'`;
		}
		return `count(${text})`;
	}
}

export function count(expression: string | ColumnDefinition = '*'): CountFunction {
	return new CountFunction(expression);
}
