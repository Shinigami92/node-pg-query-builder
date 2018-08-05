import { Cast } from '../../data-types/cast';
import { QueryResolution } from '../../resolvable';
import { RegConfig } from './reg-config';
import { TextSearchFunction } from './text-search-function';

export class ToTsQueryFunction extends TextSearchFunction {
	constructor(public readonly config: RegConfig, public readonly query: string | Cast) {
		super();
	}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		let text: string;
		const innerValues: any[] = [];
		if (this.query instanceof Cast) {
			const resolution: QueryResolution = this.query.resolveQuery(valueIndex, values);
			text = resolution.text;
			valueIndex = resolution.valueIndex;
			innerValues.push(...resolution.values);
		} else {
			text = `$${valueIndex++}`;
			const value: string = this.query;
			innerValues.push(value);
		}
		return {
			text: `to_tsquery('${this.config}', ${text})`,
			valueIndex,
			values: [...values, ...innerValues]
		};
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
