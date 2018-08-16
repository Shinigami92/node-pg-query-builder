export function assertNever(value: never, noThrow: boolean = false): never {
	if (noThrow) {
		return value;
	}
	throw new Error(`Unexpected object: ${JSON.stringify(value)}`);
}
