import { Resolvable } from '../../resolvable';

export abstract class LogicalOperator implements Resolvable {
	public abstract resolve(): string;
}
