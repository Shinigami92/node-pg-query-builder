import { AliasReference } from '../definitions/alias-reference';
import { ToTsQueryFunction } from '../functions/text-search/to-tsquery';
import { ToTsVectorFunction } from '../functions/text-search/to-tsvector';
import { isResolvable, QueryResolution } from '../resolvable';
import { Join } from './join';

export class CrossJoin extends Join {
	constructor(
		private readonly tableName: string | ToTsQueryFunction | ToTsVectorFunction,
		private readonly alias: AliasReference
	) {
		super('CROSS');
	}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		let text: string;
		const innerValues: any[] = [];
		if (isResolvable(this.tableName)) {
			const resolution: QueryResolution = this.tableName.resolveQuery(valueIndex, values);
			text = resolution.text;
			valueIndex = resolution.valueIndex;
			innerValues.push(...resolution.values);
		} else {
			text = this.tableName;
		}
		return {
			text: `CROSS JOIN ${text} AS ${this.alias.aliasName}`,
			valueIndex,
			values: [...innerValues]
		};
	}

	public resolve(): string {
		let text: string;
		if (isResolvable(this.tableName)) {
			text = this.tableName.resolve();
		} else {
			text = this.tableName;
		}
		return `CROSS JOIN ${text} AS ${this.alias.aliasName}`;
	}
}
