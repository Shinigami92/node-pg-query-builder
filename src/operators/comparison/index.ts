import { Cast } from '../../data-types/cast';
import { QueryBuilder } from '../../query/query';

import { BetweenComparisonOperator } from './between';
export const between: {
	(column: string, x: number, y: number): BetweenComparisonOperator;
	(column: string, x: string, y: string): BetweenComparisonOperator;
} =
	BetweenComparisonOperator.between;

import { EqualsComparisonOperator } from './equal';
export const eq: (column: string, value: string | number | Cast) => EqualsComparisonOperator =
	EqualsComparisonOperator.eq;

import { ExistsComparisonOperator } from './exists';
export const exists: (subquery: string | QueryBuilder) => ExistsComparisonOperator = ExistsComparisonOperator.exists;

import { GreaterEqualComparisonOperator } from './greater-equal';
export const ge: (column: string, value: string | number | QueryBuilder) => GreaterEqualComparisonOperator =
	GreaterEqualComparisonOperator.ge;

import { GreaterThanComparisonOperator } from './greater-than';
export const gt: (column: string, value: string | number | QueryBuilder) => GreaterThanComparisonOperator =
	GreaterThanComparisonOperator.gt;

import { InComparisonOperator } from './in';
export const inList: (column: string, values: ReadonlyArray<string | number>) => InComparisonOperator =
	InComparisonOperator.in;

import { NotInComparisonOperator } from './not-in';
export const notInList: (column: string, values: ReadonlyArray<string | number>) => NotInComparisonOperator =
	NotInComparisonOperator.notIn;

import { IsNullComparisonOperator } from './is-null';
export const isNull: (column: string) => IsNullComparisonOperator = IsNullComparisonOperator.isNull;

import { IsNotNullComparisonOperator } from './is-not-null';
export const isNotNull: (column: string) => IsNotNullComparisonOperator = IsNotNullComparisonOperator.isNotNull;

import { LikeComparisonOperator } from './like';
export const like: (column: string, value: string) => LikeComparisonOperator = LikeComparisonOperator.like;
