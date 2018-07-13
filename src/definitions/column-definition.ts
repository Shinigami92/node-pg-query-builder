import { TableDefinition } from './table-definition';

export class ColumnDefinition {
	constructor(
		private readonly _name: string,
		public readonly dataType: string,
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
