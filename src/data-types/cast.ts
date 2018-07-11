export class Cast {
	public static cast(value: string, type: string): Cast {
		return new Cast(value, type);
	}

	constructor(public readonly value: string, public readonly type: string) {}

	public resolve(): string {
		return `'${this.value}'::${this.type}`;
	}
}
