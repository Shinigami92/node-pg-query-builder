import { QueryableValue } from '../../queryable';
import { ComparisonOperator } from './comparison-operator';

export class NotEqualsComparisonOperator extends ComparisonOperator {
	constructor(readonly leftValue: QueryableValue, readonly rightValue: QueryableValue) {
		super(leftValue, rightValue, '!=');
	}
}

export function ne(leftValue: QueryableValue, rightValue: QueryableValue): NotEqualsComparisonOperator {
	return new NotEqualsComparisonOperator(leftValue, rightValue);
}
