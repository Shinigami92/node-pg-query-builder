import { TsQueryAliasReference } from '../../definitions/tsquery-alias-reference';
import { TsVectorAliasReference } from '../../definitions/tsvector-alias-reference';
import { QueryResolution } from '../../resolvable';
import { TextSearchFunction } from './text-search-function';
import { ToTsQueryFunction } from './to-tsquery';
import { ToTsVectorFunction } from './to-tsvector';

export class TsVectorMatchesTsQueryFunction extends TextSearchFunction {
	constructor(
		public readonly tsvector: ToTsVectorFunction | TsVectorAliasReference,
		public readonly tsquery: ToTsQueryFunction | TsQueryAliasReference
	) {
		super();
	}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		const texts: [string, string] = ['', ''];
		const innerValues: any[] = [];
		if (this.tsvector instanceof TsVectorAliasReference) {
			texts[0] = this.tsvector.aliasName;
		} else {
			const resolution: QueryResolution = this.tsvector.resolveQuery(valueIndex, values);
			texts[0] = resolution.text;
			valueIndex = resolution.valueIndex;
			innerValues.push(...resolution.values);
		}
		if (this.tsquery instanceof TsQueryAliasReference) {
			texts[1] = this.tsquery.aliasName;
		} else {
			const resolution: QueryResolution = this.tsquery.resolveQuery(valueIndex, values);
			texts[1] = resolution.text;
			valueIndex = resolution.valueIndex;
			innerValues.push(...resolution.values);
		}
		return {
			text: texts.join(' @@ '),
			valueIndex,
			values: [...values, ...innerValues]
		};
	}

	public resolve(): string {
		let tsvector: string;
		if (this.tsvector instanceof TsVectorAliasReference) {
			tsvector = this.tsvector.aliasName;
		} else {
			tsvector = this.tsvector.resolve();
		}
		let tsquery: string;
		if (this.tsquery instanceof TsQueryAliasReference) {
			tsquery = this.tsquery.aliasName;
		} else {
			tsquery = this.tsquery.resolve();
		}
		return `${tsvector} @@ ${tsquery}`;
	}
}

export function tsvector_matches_tsquery(
	tsvector: ToTsVectorFunction | TsVectorAliasReference,
	tsquery: ToTsQueryFunction | TsQueryAliasReference
): TsVectorMatchesTsQueryFunction {
	return new TsVectorMatchesTsQueryFunction(tsvector, tsquery);
}
