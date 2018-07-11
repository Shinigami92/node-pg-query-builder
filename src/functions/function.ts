import { Resolvable } from '../resolvable';

export abstract class Function implements Resolvable {
	public abstract resolve(): string;
}
