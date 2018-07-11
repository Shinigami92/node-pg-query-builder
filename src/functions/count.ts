import { Function } from './function';

export class CountFunction extends Function {
	public static count(expression: string = '*'): CountFunction {
		return new CountFunction(expression);
	}

	constructor(public readonly expression: string) {
		super();
	}

	public resolve(): string {
		return `count('${this.expression}')`;
	}
}
