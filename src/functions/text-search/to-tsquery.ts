import { TextSearchFunction } from './text-search-function';

export class ToTsQueryFunction extends TextSearchFunction {
	public static to_tsquery(config: 'simple', query: string): ToTsQueryFunction {
		return new ToTsQueryFunction(config, query);
	}

	constructor(public readonly config: 'simple', public readonly query: string) {
		super();
	}

	public resolve(): string {
		return `to_tsquery('${this.config}', ${this.query})`;
	}
}
