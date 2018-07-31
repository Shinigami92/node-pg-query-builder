import { QueryResolution } from '../../resolvable';
import { ComparisonOperator } from '../comparison/comparison-operator';
import { LogicalOperator } from './logical-operator';

export class OrLogicalOperator extends LogicalOperator {
	constructor(public readonly values: ReadonlyArray<ComparisonOperator>) {
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
			text: texts.join(' OR '),
			valueIndex,
			values: innerValues
		};
	}

	public resolve(): string {
		return this.values.map((v: ComparisonOperator) => v.resolve()).join(' OR ');
	}
}

export function or(values: ReadonlyArray<ComparisonOperator>): OrLogicalOperator {
	return new OrLogicalOperator(values);
}
