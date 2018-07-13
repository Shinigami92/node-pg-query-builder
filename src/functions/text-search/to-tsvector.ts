import { ColumnDefinition } from '../../definitions/column-definition';
import { RegConfig } from './reg-config';
import { TextSearchFunction } from './text-search-function';

export class ToTsVectorFunction extends TextSearchFunction {
	public static to_tsvector(config: RegConfig, document: ColumnDefinition): ToTsVectorFunction {
		return new ToTsVectorFunction(config, document);
	}

	constructor(public readonly config: RegConfig, public readonly document: ColumnDefinition) {
		super();
	}

	public resolve(): string {
		return `to_tsvector('${this.config}', ${this.document.name})`;
	}
}
