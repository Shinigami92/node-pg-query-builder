import { Aliasable } from './query';
import { SelectQueryBuilder } from './select';

export function select(selections: string | Array<string | Aliasable>): SelectQueryBuilder {
	return new SelectQueryBuilder(selections);
}
