export class ToTsVectorFunction {
	public static to_tsvector(config: 'simple', document: string): ToTsVectorFunction {
		return new ToTsVectorFunction(config, document);
	}

	constructor(public readonly config: 'simple', public readonly document: string) {}

	public resolve(): string {
		return `to_tsvector('${this.config}', ${this.document})`;
	}
}
