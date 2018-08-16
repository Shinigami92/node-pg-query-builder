import { TableDefinition } from '../definitions/table-definition';
import { EqualsComparisonOperator } from '../operators/comparison/equal';
import { Join } from './join';

export class LeftJoin extends Join {
	constructor(readonly tableDefinition: TableDefinition, readonly onExpression: EqualsComparisonOperator) {
		super('LEFT', tableDefinition, onExpression);
	}
}
