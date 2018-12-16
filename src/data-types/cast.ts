import { AggregateFunction } from '../functions/aggregate/aggregate-function';
import { QueryResolution, Resolvable } from '../resolvable';
import { DataType } from './data-type';

export class Cast implements Resolvable {
	constructor(public readonly value: string | AggregateFunction | null, public readonly type: DataType) {}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		let text: string;
		const innerValues: any[] = [];
		if (this.value instanceof AggregateFunction) {
			const resolution: QueryResolution = this.value.resolveQuery(valueIndex, values);
			text = resolution.text;
			valueIndex = resolution.valueIndex;
			innerValues.push(...resolution.values);
		} else {
			text = `$${valueIndex++}`;
			innerValues.push(this.value);
		}
		return {
			text: `${text}::${this.type.definition}`,
			valueIndex,
			values: [...innerValues]
		};
	}

	public resolve(): string {
		let text: string;
		if (this.value instanceof AggregateFunction) {
			text = this.value.resolve();
		} else if (this.value === null) {
			text = 'null';
		} else {
			text = `'${this.value}'`;
		}
		return `${text}::${this.type.definition}`;
	}
}

export function cast(value: string | AggregateFunction | null, type: DataType): Cast {
	return new Cast(value, type);
}
