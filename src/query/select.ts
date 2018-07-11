import { TsRankCdFunction } from '../functions/text-search/ts-rank-cd';
import { FromQueryBuilder } from './from';
import { Aliasable } from './query';

export class SelectQueryBuilder {
	public selects: string[] = [];

	constructor(selections: string | Array<string | Aliasable>) {
		if (typeof selections === 'string') {
			this.selects = [selections];
		} else {
			this.selects = selections.map((selection: string | Aliasable) => {
				if (typeof selection === 'string') {
					return selection;
				}
				for (const alias in selection) {
					if (selection.hasOwnProperty(alias)) {
						const value: string | TsRankCdFunction = selection[alias];
						if (value instanceof TsRankCdFunction) {
							return `${value.resolve()} AS ${alias}`;
						}
						return `${value} AS ${alias}`;
					}
				}
				return '';
			});
		}
	}
	public from(tableName: string | Aliasable): FromQueryBuilder {
		return new FromQueryBuilder(this, tableName);
	}
}
