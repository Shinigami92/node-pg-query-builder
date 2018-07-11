import { TsVectorMatchesTsQueryFunction } from '../../functions/text-search/tsvector-matches-tsquery';
import { ComparisonOperator } from '../comparison/comparison-operator';

export class AndLogicalOperator {
	public static and(values: ReadonlyArray<ComparisonOperator | TsVectorMatchesTsQueryFunction>): AndLogicalOperator {
		return new AndLogicalOperator(values);
	}

	constructor(public readonly values: ReadonlyArray<ComparisonOperator | TsVectorMatchesTsQueryFunction>) {}

	public resolve(): string {
		return this.values.map((v: ComparisonOperator) => v.resolve()).join(' AND ');
	}
}
