import { QueryResolution } from '../resolvable';
import { Function } from './function';

export class CountFunction extends Function {
	constructor(public readonly expression: string) {
		super();
	}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		throw new Error('Not supported yet');
	}

	public resolve(): string {
		return `count('${this.expression}')`;
	}
}

export function count(expression: string = '*'): CountFunction {
	return new CountFunction(expression);
}
