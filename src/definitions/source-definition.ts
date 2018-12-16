import { AliasReference } from './alias-reference';
import { ColumnDefinition } from './column-definition';
import { STAR_TYPE } from './star-type';

export class StarColumnDefinition extends ColumnDefinition {
	constructor(public readonly source?: SourceDefinition) {
		super('*', STAR_TYPE, source);
	}
}

export abstract class SourceDefinition {
	constructor(public readonly __name: string, public readonly alias?: AliasReference) {}

	public get __star(): StarColumnDefinition {
		return new StarColumnDefinition(this);
	}
}
