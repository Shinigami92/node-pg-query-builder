import { AliasReference } from './alias-reference';
import { SourceDefinition } from './source-definition';

export abstract class TableDefinition extends SourceDefinition {
	constructor(tableName: string, alias?: AliasReference) {
		super(tableName, alias);
	}
}
