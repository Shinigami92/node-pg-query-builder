import { TsVectorMatchesTsQueryFunction } from '../../functions/text-search/tsvector-matches-tsquery';
import { ComparisonOperator } from '../comparison/comparison-operator';

import { AndLogicalOperator } from './and';
export const and: (values: ReadonlyArray<ComparisonOperator | TsVectorMatchesTsQueryFunction>) => AndLogicalOperator =
	AndLogicalOperator.and;

import { OrLogicalOperator } from './or';
export const or: (values: ReadonlyArray<ComparisonOperator>) => OrLogicalOperator = OrLogicalOperator.or;
