import { ColumnDefinition } from '../../definitions/column-definition';
import { QueryResolution } from '../../resolvable';
import { RegConfig } from './reg-config';
import { TextSearchFunction } from './text-search-function';

export class ToTsVectorFunction extends TextSearchFunction {
	constructor(public readonly config: RegConfig, public readonly document: ColumnDefinition) {
		super();
	}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		return {
			text: `to_tsvector('${this.config}', ${this.document.name})`,
			valueIndex,
			values: [...values]
		};
	}

	public resolve(): string {
		return `to_tsvector('${this.config}', ${this.document.name})`;
	}
}

export function to_tsvector(config: RegConfig, document: ColumnDefinition): ToTsVectorFunction {
	return new ToTsVectorFunction(config, document);
}
