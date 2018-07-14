import { AliasReference } from '../definitions/alias-reference';
import { ColumnDefinition } from '../definitions/column-definition';
import { TableDefinition } from '../definitions/table-definition';
import { TsRankCdFunction } from '../functions/text-search/ts-rank-cd';
import { FromQueryBuilder } from './from';

export class SelectQueryBuilder {
	public readonly selects: Array<ColumnDefinition | [string | TsRankCdFunction, AliasReference | undefined]> = [];

	constructor(...selections: Array<ColumnDefinition | [string | TsRankCdFunction, AliasReference | undefined]>) {
		this.selects.push(...selections);
	}
	public from(tableName: TableDefinition): FromQueryBuilder {
		return new FromQueryBuilder(this, tableName);
	}
}

export function select(
	...selections: Array<ColumnDefinition | [string | TsRankCdFunction, AliasReference]>
): SelectQueryBuilder {
	return new SelectQueryBuilder(...selections);
}
