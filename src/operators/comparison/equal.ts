import { QueryableValue } from '../../queryable';
import { ComparisonOperator } from './comparison-operator';

/**
 * Contains the definition for the equals statement
 *
 * @author Christopher Quadflieg <chrissi92@hotmail.de>
 * @since 1.0.0
 * @version 1.0.0
 */
export class EqualsComparisonOperator extends ComparisonOperator {
	constructor(readonly leftValue: QueryableValue, readonly rightValue: QueryableValue) {
		super(leftValue, rightValue, '=');
	}
}

/**
 * Builds an instance containing the definition for the equals statement
 *
 * @param leftValue The left side of =
 * @param rightValue The right side of =
 * @returns Instance that contains the definition for the equals statement
 */
export function eq(leftValue: QueryableValue, rightValue: QueryableValue): EqualsComparisonOperator {
	return new EqualsComparisonOperator(leftValue, rightValue);
}
