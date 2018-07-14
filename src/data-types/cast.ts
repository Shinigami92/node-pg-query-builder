import { DataType } from './data-type';

export class Cast {
	constructor(public readonly value: string, public readonly type: DataType) {}

	public resolve(): string {
		return `'${this.value}'::${this.type.definition}`;
	}
}

export function cast(value: string, type: DataType): Cast {
	return new Cast(value, type);
}
