import { Cast } from '../../data-types/cast';
import { ColumnDefinition } from '../../definitions/column-definition';
import { QueryBuilder } from '../../query/query';

import { BetweenComparisonOperator } from './between';
export const between: {
	(column: ColumnDefinition, x: number, y: number): BetweenComparisonOperator;
	(column: ColumnDefinition, x: string, y: string): BetweenComparisonOperator;
} =
	BetweenComparisonOperator.between;

import { EqualsComparisonOperator } from './equal';
export const eq: (column: ColumnDefinition, value: string | number | Cast) => EqualsComparisonOperator =
	EqualsComparisonOperator.eq;

import { ExistsComparisonOperator } from './exists';
export const exists: (subquery: string | QueryBuilder) => ExistsComparisonOperator = ExistsComparisonOperator.exists;

import { GreaterEqualComparisonOperator } from './greater-equal';
export const ge: (column: ColumnDefinition, value: string | number | QueryBuilder) => GreaterEqualComparisonOperator =
	GreaterEqualComparisonOperator.ge;

import { GreaterThanComparisonOperator } from './greater-than';
export const gt: (column: ColumnDefinition, value: string | number | QueryBuilder) => GreaterThanComparisonOperator =
	GreaterThanComparisonOperator.gt;

import { InComparisonOperator } from './in';
export const inList: (column: ColumnDefinition, values: ReadonlyArray<string | number>) => InComparisonOperator =
	InComparisonOperator.in;

import { NotInComparisonOperator } from './not-in';
export const notInList: (column: ColumnDefinition, values: ReadonlyArray<string | number>) => NotInComparisonOperator =
	NotInComparisonOperator.notIn;

import { IsNullComparisonOperator } from './is-null';
export const isNull: (column: ColumnDefinition) => IsNullComparisonOperator = IsNullComparisonOperator.isNull;

import { IsNotNullComparisonOperator } from './is-not-null';
export const isNotNull: (column: ColumnDefinition) => IsNotNullComparisonOperator =
	IsNotNullComparisonOperator.isNotNull;

import { LikeComparisonOperator } from './like';
export const like: (column: ColumnDefinition, value: string) => LikeComparisonOperator = LikeComparisonOperator.like;
