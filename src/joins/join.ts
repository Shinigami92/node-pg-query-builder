import { QueryResolution, Resolvable } from '../resolvable';

export abstract class Join implements Resolvable {
	public abstract resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution;
	public abstract resolve(): string;
}
