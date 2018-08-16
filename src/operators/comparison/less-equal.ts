import { QueryableValue } from '../../queryable';
import { ComparisonOperator } from './comparison-operator';

export class LessEqualComparisonOperator extends ComparisonOperator {
	constructor(readonly leftValue: QueryableValue, readonly rightValue: QueryableValue) {
		super(leftValue, rightValue, '<=');
	}
}

export function le(leftValue: QueryableValue, rightValue: QueryableValue): LessEqualComparisonOperator {
	return new LessEqualComparisonOperator(leftValue, rightValue);
}
