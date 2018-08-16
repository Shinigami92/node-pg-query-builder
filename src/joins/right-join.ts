import { TableDefinition } from '../definitions/table-definition';
import { EqualsComparisonOperator } from '../operators/comparison/equal';
import { Join } from './join';

export class RightJoin extends Join {
	constructor(readonly tableDefinition: TableDefinition, readonly onExpression: EqualsComparisonOperator) {
		super('RIGHT', tableDefinition, onExpression);
	}
}
