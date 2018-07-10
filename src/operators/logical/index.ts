export function and(values: string[]): string {
	return values.join(' AND ');
}

export function or(values: string[]): string {
	return values.join(' OR ');
}
