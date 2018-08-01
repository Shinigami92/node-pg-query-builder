import { Cast } from '../../data-types/cast';
import { QueryResolution } from '../../resolvable';
import { RegConfig } from './reg-config';
import { TextSearchFunction } from './text-search-function';

export class ToTsQueryFunction extends TextSearchFunction {
	constructor(public readonly config: RegConfig, public readonly query: string | Cast) {
		super();
	}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		throw new Error('Not supported yet');
	}

	public resolve(): string {
		let query: string;
		if (this.query instanceof Cast) {
			query = this.query.resolve();
		} else {
			query = `'${this.query}'`;
		}
		return `to_tsquery('${this.config}', ${query})`;
	}
}

export function to_tsquery(config: RegConfig, query: string | Cast): ToTsQueryFunction {
	return new ToTsQueryFunction(config, query);
}
