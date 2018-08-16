import { QueryBuilder, QueryConfig } from '../../query/query';
import { QueryResolution } from '../../resolvable';
import { ComparisonPredicate } from './comparison-predicate';

export class ExistsComparisonPredicate extends ComparisonPredicate {
	constructor(public readonly subquery: string | QueryBuilder) {
		super();
	}

	public resolveQuery(valueIndex: number, values: ReadonlyArray<any>): QueryResolution {
		if (this.subquery instanceof QueryBuilder) {
			const queryConfig: QueryConfig = this.subquery.toQuery({ semicolon: false });
			const values: any[] = queryConfig.values || [];
			return {
				text: `EXISTS (${queryConfig.text})`,
				valueIndex: valueIndex + values.length + 1,
				values
			};
		}
		return {
			text: `EXISTS $${valueIndex++}`,
			valueIndex,
			values: [...values, this.subquery]
		};
	}

	public resolve(): string {
		let subquery: string;
		if (this.subquery instanceof QueryBuilder) {
			subquery = this.subquery.toSQL({ semicolon: false });
		} else {
			subquery = this.subquery;
		}
		return `EXISTS (${subquery})`;
	}
}

export function exists(subquery: string | QueryBuilder): ExistsComparisonPredicate {
	return new ExistsComparisonPredicate(subquery);
}
