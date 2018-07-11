export class ToTsQueryFunction {
	public static to_tsquery(config: 'simple', query: string): ToTsQueryFunction {
		return new ToTsQueryFunction(config, query);
	}

	constructor(public readonly config: 'simple', public readonly query: string) {}

	public resolve(): string {
		return `to_tsquery('${this.config}', ${this.query})`;
	}
}
