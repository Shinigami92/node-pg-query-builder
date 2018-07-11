import { Resolvable } from '../../resolvable';

export abstract class ComparisonOperator implements Resolvable {
	public abstract resolve(): string;
}
