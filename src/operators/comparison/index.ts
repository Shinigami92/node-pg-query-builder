import { QueryBuilder } from '../../query/query';

export function between(column: string, x: number, y: number): string;
export function between(column: string, x: string, y: string): string;
export function between(column: string, x: string | number, y: string | number): string {
	if (typeof x === 'number') {
		return `${column} BETWEEN ${x} AND ${y}`;
	}
	return `${column} BETWEEN '${x}' AND '${y}'`;
}

export function eq(column: string, value: string | number): string {
	return `${column} = ${value}`;
}

export function exists(subquery: string | QueryBuilder): string {
	if (subquery instanceof QueryBuilder) {
		subquery = subquery.toSQL({ semicolon: false });
	}
	return `EXISTS (${subquery})`;
}

export function ge(column: string, value: string | number): string {
	return `${column} >= ${value}`;
}

export function gt(column: string, value: string | number | QueryBuilder): string {
	if (value instanceof QueryBuilder) {
		value = `(${value.toSQL({ semicolon: false })})`;
	}
	return `${column} > ${value}`;
}

export function like(column: string, value: string): string {
	return `${column} LIKE '${value}'`;
}

export function inList(column: string, values: Array<string | number>): string {
	return `${column} IN (${values.join(', ')})`;
}

export function notInList(column: string, values: Array<string | number>): string {
	return `${column} NOT IN (${values.join(', ')})`;
}

export function isNull(column: string): string {
	return `${column} IS NULL`;
}

export function isNotNull(column: string): string {
	return `${column} IS NOT NULL`;
}
