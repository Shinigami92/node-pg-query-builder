import { Cast } from '../data-types';
import { AliasReference } from '../definitions/alias-reference';
import { ColumnDefinition } from '../definitions/column-definition';
import { FunctionDefinition } from '../definitions/function-definition';
import { SourceDefinition } from '../definitions/source-definition';
import { TableDefinition } from '../definitions/table-definition';
import { AggregateFunction } from '../functions/aggregate/aggregate-function';
import { TsRankCdFunction } from '../functions/text-search/ts-rank-cd';
import { FromQueryBuilder } from './from';

export class SelectQueryBuilder {
	public readonly selects: Array<
		| ColumnDefinition
		| [
				string | number | boolean | ColumnDefinition | AggregateFunction | Cast | TsRankCdFunction,
				AliasReference | undefined
		  ]
	> = [];

	constructor(
		...selections: Array<
			| ColumnDefinition
			| [
					string | number | boolean | ColumnDefinition | AggregateFunction | Cast | TsRankCdFunction,
					AliasReference | undefined
			  ]
		>
	) {
		this.selects.push(...selections);
	}

	public from(tableName: TableDefinition): FromQueryBuilder;
	public from(functionName: FunctionDefinition, parameters?: any[]): FromQueryBuilder;
	public from(source: SourceDefinition, parameters?: any[]): FromQueryBuilder {
		return new FromQueryBuilder(this, source, parameters);
	}
}

export function select(
	...selections: Array<
		| ColumnDefinition
		| [string | number | boolean | ColumnDefinition | AggregateFunction | Cast | TsRankCdFunction, AliasReference]
	>
): SelectQueryBuilder {
	return new SelectQueryBuilder(...selections);
}
