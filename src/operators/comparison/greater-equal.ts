import { QueryableValue } from '../../queryable';
import { ComparisonOperator } from './comparison-operator';

export class GreaterEqualComparisonOperator extends ComparisonOperator {
	constructor(readonly leftValue: QueryableValue, readonly rightValue: QueryableValue) {
		super(leftValue, rightValue, '>=');
	}
}

export function ge(leftValue: QueryableValue, rightValue: QueryableValue): GreaterEqualComparisonOperator {
	return new GreaterEqualComparisonOperator(leftValue, rightValue);
}
