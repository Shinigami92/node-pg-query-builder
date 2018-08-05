import { QueryResolution, Resolvable } from '../resolvable';
import { DataType } from './data-type';

export class Cast implements Resolvable {
	constructor(public readonly value: string, public readonly type: DataType) {}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		return {
			text: `$${valueIndex++}::${this.type.definition}`,
			valueIndex,
			values: [this.value]
		};
	}

	public resolve(): string {
		return `'${this.value}'::${this.type.definition}`;
	}
}

export function cast(value: string, type: DataType): Cast {
	return new Cast(value, type);
}
