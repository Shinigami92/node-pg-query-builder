import { TableDefinition } from '../definitions/table-definition';
import { EqualsComparisonOperator } from '../operators/comparison/equal';
import { Join } from './join';

export class InnerJoin extends Join {
	constructor(readonly tableDefinition: TableDefinition, readonly onExpression: EqualsComparisonOperator) {
		super('INNER', tableDefinition, onExpression);
	}
}
