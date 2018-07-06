export function ts_rank_cd(textsearch: 'textsearch', query: 'query'): string {
	return `ts_rank_cd('${textsearch}', '${query}')`;
}

export function to_tsquery(config: 'simple', query: string): string {
	return `to_tsquery('${config}', ${query})`;
}

export function to_tsvector(config: 'simple', document: string): string {
	return `to_tsvector('${config}', ${document})`;
}

export function tsvector_matches_tsquery(tsvector: string, tsquery: string): string {
	return `${tsvector} @@ ${tsquery}`;
}
