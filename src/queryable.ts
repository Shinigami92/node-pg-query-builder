import { Cast } from './data-types/cast';
import { ColumnDefinition } from './definitions/column-definition';
import { QueryBuilder } from './query/query';

export type QueryableValue = ColumnDefinition | string | number | Cast | QueryBuilder;
