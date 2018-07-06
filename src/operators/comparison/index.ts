export function eq(column: string, value: string): string {
	return `${column} = ${value}`;
}
