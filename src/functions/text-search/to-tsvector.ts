import { TextSearchFunction } from './text-search-function';

export class ToTsVectorFunction extends TextSearchFunction {
	public static to_tsvector(config: 'simple', document: string): ToTsVectorFunction {
		return new ToTsVectorFunction(config, document);
	}

	constructor(public readonly config: 'simple', public readonly document: string) {
		super();
	}

	public resolve(): string {
		return `to_tsvector('${this.config}', ${this.document})`;
	}
}
