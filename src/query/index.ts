import { AliasReference } from '../definitions/alias-reference';
import { ColumnDefinition } from '../definitions/column-definition';
import { TsRankCdFunction } from '../functions/text-search/ts-rank-cd';
import { SelectQueryBuilder } from './select';
import { UpdateQueryBuilder } from './update';

export function select(
	...selections: Array<ColumnDefinition | [string | TsRankCdFunction, AliasReference]>
): SelectQueryBuilder {
	return new SelectQueryBuilder(...selections);
}

export function update(tableName: string): UpdateQueryBuilder {
	return new UpdateQueryBuilder(tableName);
}
