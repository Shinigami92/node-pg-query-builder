import { QueryableValue } from '../../queryable';
import { ComparisonOperator } from './comparison-operator';

export class LessThanComparisonOperator extends ComparisonOperator {
	constructor(readonly leftValue: QueryableValue, readonly rightValue: QueryableValue) {
		super(leftValue, rightValue, '<');
	}
}

export function lt(leftValue: QueryableValue, rightValue: QueryableValue): LessThanComparisonOperator {
	return new LessThanComparisonOperator(leftValue, rightValue);
}
