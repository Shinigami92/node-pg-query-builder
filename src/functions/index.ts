export function count(expression: string = '*'): string {
	return `count('${expression}')`;
}
