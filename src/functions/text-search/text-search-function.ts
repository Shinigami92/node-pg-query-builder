import { QueryResolution, Resolvable } from '../../resolvable';

export abstract class TextSearchFunction implements Resolvable {
	public abstract resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution;
	public abstract resolve(): string;
}
