export class CountFunction {
	public static count(expression: string = '*'): CountFunction {
		return new CountFunction(expression);
	}

	constructor(public readonly expression: string) {}

	public resolve(): string {
		return `count('${this.expression}')`;
	}
}
