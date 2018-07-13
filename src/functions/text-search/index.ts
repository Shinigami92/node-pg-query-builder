import { Cast } from '../../data-types/cast';
import { ColumnDefinition } from '../../definitions/column-definition';

// Fulltextsearch
import { RegConfig } from './reg-config';
export { RegConfig };

import { TsRankCdFunction } from './ts-rank-cd';
export const ts_rank_cd: (
	textsearch: ToTsVectorFunction | TsVectorAliasReference,
	query: ToTsQueryFunction | TsQueryAliasReference
) => TsRankCdFunction =
	TsRankCdFunction.ts_rank_cd;

import { ToTsQueryFunction } from './to-tsquery';
export const to_tsquery: (config: RegConfig, query: string | Cast) => ToTsQueryFunction = ToTsQueryFunction.to_tsquery;

import { ToTsVectorFunction } from './to-tsvector';
export const to_tsvector: (config: RegConfig, document: ColumnDefinition) => ToTsVectorFunction =
	ToTsVectorFunction.to_tsvector;

import { TsQueryAliasReference } from '../../definitions/tsquery-alias-reference';
import { TsVectorAliasReference } from '../../definitions/tsvector-alias-reference';
import { TsVectorMatchesTsQueryFunction } from './tsvector-matches-tsquery';
export const tsvector_matches_tsquery: (
	tsvector: ToTsVectorFunction | TsVectorAliasReference,
	tsquery: ToTsQueryFunction | TsQueryAliasReference
) => TsVectorMatchesTsQueryFunction =
	TsVectorMatchesTsQueryFunction.tsvector_matches_tsquery;
