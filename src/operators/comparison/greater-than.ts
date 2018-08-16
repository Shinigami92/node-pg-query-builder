import { QueryableValue } from '../../queryable';
import { ComparisonOperator } from './comparison-operator';

export class GreaterThanComparisonOperator extends ComparisonOperator {
	constructor(readonly leftValue: QueryableValue, readonly rightValue: QueryableValue) {
		super(leftValue, rightValue, '>');
	}
}

export function gt(leftValue: QueryableValue, rightValue: QueryableValue): GreaterThanComparisonOperator {
	return new GreaterThanComparisonOperator(leftValue, rightValue);
}
