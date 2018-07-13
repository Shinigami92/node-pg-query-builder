import { AliasReference } from './alias-reference';
import { ColumnDefinition } from './column-definition';

export class StarColumnDefinition extends ColumnDefinition {
	constructor(public readonly table?: TableDefinition) {
		super('*', 'star', table);
	}
}

export const GLOBAL_STAR: StarColumnDefinition = new StarColumnDefinition();

export abstract class TableDefinition {
	constructor(public readonly tableName: string, public readonly alias?: AliasReference) {}

	public get __star(): StarColumnDefinition {
		return new StarColumnDefinition(this);
	}
}
