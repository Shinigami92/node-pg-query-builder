import { DataType } from '../data-types/data-type';
import { TableDefinition } from './table-definition';

export class ColumnDefinition {
	constructor(
		private readonly _name: string,
		public readonly dataType: DataType,
		public readonly table?: TableDefinition
	) {}

	public get name(): string {
		let name: string = '';
		if (this.table !== undefined) {
			if (this.table.alias) {
				name = this.table.alias.aliasName;
			} else {
				name = this.table.tableName;
			}
			name += '.';
		}
		name += this._name;
		return name;
	}
}
