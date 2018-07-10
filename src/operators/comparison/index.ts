export function eq(column: string, value: string | number): string {
	return `${column} = ${value}`;
}

export function ge(column: string, value: string | number): string {
	return `${column} >= ${value}`;
}
