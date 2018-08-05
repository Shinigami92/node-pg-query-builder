import { AggregateFunction } from '../functions/aggregate/aggregate-function';
import { QueryResolution, Resolvable } from '../resolvable';
import { DataType } from './data-type';

export class Cast implements Resolvable {
	constructor(public readonly value: string | AggregateFunction, public readonly type: DataType) {}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		return {
			text: `$${valueIndex++}::${this.type.definition}`,
			valueIndex,
			values: [this.value]
		};
	}

	public resolve(): string {
		let text: string;
		if (this.value instanceof AggregateFunction) {
			text = this.value.resolve();
		} else {
			text = `'${this.value}'`;
		}
		return `${text}::${this.type.definition}`;
	}
}

export function cast(value: string | AggregateFunction, type: DataType): Cast {
	return new Cast(value, type);
}
