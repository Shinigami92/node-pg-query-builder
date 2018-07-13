import { DataType } from '../data-types/data-type';
import { AliasReference } from './alias-reference';
import { ColumnDefinition } from './column-definition';

export class StarType extends DataType {
	constructor() {
		super('*');
	}
}

export const STAR_TYPE: StarType = new StarType();

export class StarColumnDefinition extends ColumnDefinition {
	constructor(public readonly table?: TableDefinition) {
		super('*', STAR_TYPE, table);
	}
}

export const GLOBAL_STAR: StarColumnDefinition = new StarColumnDefinition();

export abstract class TableDefinition {
	constructor(public readonly tableName: string, public readonly alias?: AliasReference) {}

	public get __star(): StarColumnDefinition {
		return new StarColumnDefinition(this);
	}
}
