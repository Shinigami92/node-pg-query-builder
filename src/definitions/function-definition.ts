import { DataType } from '../data-types/data-type';
import { AliasReference } from './alias-reference';
import { SourceDefinition } from './source-definition';

export abstract class FunctionDefinition extends SourceDefinition {
	constructor(functionName: string, public readonly parameters?: DataType[], alias?: AliasReference) {
		super(functionName, alias);
	}
}
