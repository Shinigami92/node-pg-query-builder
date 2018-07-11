import { TsRankCdFunction } from './ts-rank-cd';
export const ts_rank_cd: (textsearch: 'textsearch', query: 'query') => TsRankCdFunction = TsRankCdFunction.ts_rank_cd;

import { ToTsQueryFunction } from './to-tsquery';
export const to_tsquery: (config: 'simple', query: string) => ToTsQueryFunction = ToTsQueryFunction.to_tsquery;

import { ToTsVectorFunction } from './to-tsvector';
export const to_tsvector: (config: 'simple', document: string) => ToTsVectorFunction = ToTsVectorFunction.to_tsvector;

import { TsVectorMatchesTsQueryFunction } from './tsvector-matches-tsquery';
export const tsvector_matches_tsquery: (tsvector: string, tsquery: string) => TsVectorMatchesTsQueryFunction =
	TsVectorMatchesTsQueryFunction.tsvector_matches_tsquery;
