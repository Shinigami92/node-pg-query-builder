import { Resolvable } from '../../resolvable';

export abstract class TextSearchFunction implements Resolvable {
	public abstract resolve(): string;
}
