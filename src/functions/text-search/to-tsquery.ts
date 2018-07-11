import { Cast } from '../../data-types/cast';
import { TextSearchFunction } from './text-search-function';

export class ToTsQueryFunction extends TextSearchFunction {
	public static to_tsquery(config: 'simple', query: string | Cast): ToTsQueryFunction {
		return new ToTsQueryFunction(config, query);
	}

	constructor(public readonly config: 'simple', public readonly query: string | Cast) {
		super();
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
