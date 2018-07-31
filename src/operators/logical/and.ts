import { TsVectorMatchesTsQueryFunction } from '../../functions/text-search/tsvector-matches-tsquery';
import { QueryResolution } from '../../resolvable';
import { ComparisonOperator } from '../comparison/comparison-operator';
import { LogicalOperator } from './logical-operator';

export class AndLogicalOperator extends LogicalOperator {
	constructor(public readonly values: ReadonlyArray<ComparisonOperator | TsVectorMatchesTsQueryFunction>) {
		super();
	}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		const texts: string[] = [];
		let innerValues: any[] = [...values];
		for (const v of this.values) {
			const resolution: QueryResolution = v.resolveQuery(valueIndex, innerValues);
			texts.push(resolution.text);
			valueIndex = resolution.valueIndex;
			innerValues = resolution.values;
		}
		return {
			text: texts.join(' AND '),
			valueIndex,
			values: innerValues
		};
	}

	public resolve(): string {
		return this.values.map((v: ComparisonOperator | TsVectorMatchesTsQueryFunction) => v.resolve()).join(' AND ');
	}
}

export function and(values: ReadonlyArray<ComparisonOperator | TsVectorMatchesTsQueryFunction>): AndLogicalOperator {
	return new AndLogicalOperator(values);
}
