import { DataType } from '../data-types/data-type';
import { SourceDefinition } from './source-definition';

export class ColumnDefinition {
	constructor(
		private readonly _name: string,
		public readonly dataType: DataType,
		public readonly source?: SourceDefinition
	) {}

	public get name(): string {
		let name: string = '';
		if (this.source !== undefined) {
			if (this.source.alias) {
				name = this.source.alias.aliasName;
			} else {
				name = this.source.__name;
			}
			name += '.';
		}
		name += this._name;
		return name;
	}
}
