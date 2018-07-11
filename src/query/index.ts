import { Aliasable } from './query';
import { SelectQueryBuilder } from './select';
import { UpdateQueryBuilder } from './update';

export function select(selections: string | Array<string | Aliasable>): SelectQueryBuilder {
	return new SelectQueryBuilder(selections);
}

export function update(tableName: string): UpdateQueryBuilder {
	return new UpdateQueryBuilder(tableName);
}
