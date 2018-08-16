import { TableDefinition } from '../definitions/table-definition';
import { EqualsComparisonOperator } from '../operators/comparison/equal';
import { QueryResolution, Resolvable } from '../resolvable';

export abstract class Join implements Resolvable {
	constructor(
		protected readonly joinType: string,
		protected readonly tableDefinition?: TableDefinition,
		protected readonly onExpression?: EqualsComparisonOperator
	) {}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		if (this.tableDefinition === undefined || this.onExpression === undefined) {
			throw new Error(`Method not overriden by class ${this.constructor.name}`);
		}
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
			text: `${this.joinType} JOIN ${this.tableDefinition.tableName}${alias} ON ${text}`,
			valueIndex,
			values: [...innerValues]
		};
	}

	public resolve(): string {
		if (this.tableDefinition === undefined || this.onExpression === undefined) {
			throw new Error(`Method was not overridden by class ${this.constructor.name}`);
		}
		let alias: string = '';
		if (this.tableDefinition.alias) {
			alias = ` AS ${this.tableDefinition.alias.aliasName}`;
		}
		return `${this.joinType} JOIN ${this.tableDefinition.tableName}${alias} ON ${this.onExpression.resolve()}`;
	}
}
