import { TableDefinition } from '../definitions/table-definition';
import { EqualsComparisonOperator } from '../operators/comparison/equal';
import { QueryResolution } from '../resolvable';
import { Join } from './join';

export class InnerJoin extends Join {
	constructor(
		private readonly tableDefinition: TableDefinition,
		private readonly onExpression: EqualsComparisonOperator
	) {
		super();
	}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		const resolution: QueryResolution = this.onExpression.resolveQuery(valueIndex, values);
		const text: string = resolution.text;
		valueIndex = resolution.valueIndex;
		const innerValues: any[] = [];
		innerValues.push(...resolution.values);

		let alias: string = '';
		if (this.tableDefinition.alias) {
			alias = ` AS ${this.tableDefinition.alias.aliasName}`;
		}

		return {
			text: `INNER JOIN ${this.tableDefinition.tableName}${alias} ON ${text}`,
			valueIndex,
			values: [...innerValues]
		};
	}

	public resolve(): string {
		let alias: string = '';
		if (this.tableDefinition.alias) {
			alias = ` AS ${this.tableDefinition.alias.aliasName}`;
		}
		return `INNER JOIN ${this.tableDefinition.tableName}${alias} ON ${this.onExpression.resolve()}`;
	}
}
