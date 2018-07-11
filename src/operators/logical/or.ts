import { ComparisonOperator } from '../comparison/comparison-operator';
import { LogicalOperator } from './logical-operator';

export class OrLogicalOperator extends LogicalOperator {
	public static or(values: ReadonlyArray<ComparisonOperator>): OrLogicalOperator {
		return new OrLogicalOperator(values);
	}

	constructor(public readonly values: ReadonlyArray<ComparisonOperator>) {
		super();
	}

	public resolve(): string {
		return this.values.map((v: ComparisonOperator) => v.resolve()).join(' OR ');
	}
}
