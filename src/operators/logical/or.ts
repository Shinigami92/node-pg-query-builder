import { ComparisonOperator } from '../comparison/comparison-operator';

export class OrLogicalOperator {
	public static or(values: ReadonlyArray<ComparisonOperator>): OrLogicalOperator {
		return new OrLogicalOperator(values);
	}

	constructor(public readonly values: ReadonlyArray<ComparisonOperator>) {}

	public resolve(): string {
		return this.values.map((v: ComparisonOperator) => v.resolve()).join(' OR ');
	}
}
