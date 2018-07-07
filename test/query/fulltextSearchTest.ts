import { expect } from 'chai';

import { cast, DataType } from '../../src/data-types';
import { to_tsquery, to_tsvector, ts_rank_cd, tsvector_matches_tsquery } from '../../src/functions/text-search';
import { eq } from '../../src/operators/comparison';
import { and } from '../../src/operators/logical';
import { select } from '../../src/query';
import { QueryBuilder } from '../../src/query/query';

describe('FulltextSearch', function(): void {
	it('should be pretty printed when pretty is enabled', function(): void {
		const query: QueryBuilder = select(['v.*', { rank: ts_rank_cd('textsearch', 'query') }])
			.from({ v: 'v_fulltext_search' })
			.crossJoin(to_tsquery('simple', cast('abc:*', DataType.TEXT)), 'query')
			.crossJoin(to_tsvector('simple', 'v.searchtext'), 'textsearch')
			.where(
				and([
					eq('v.user_id', cast('971acc92-5b1e-4dd4-b177-a0dee7a27c21', DataType.UUID)),
					tsvector_matches_tsquery('query', 'textsearch')
				])
			)
			.orderBy(['created_date', { rank: 'DESC' }])
			.limit(10)
			.offset(0);

		const sql: string = query.toSQL({ pretty: true });

		const sqlString: string = `SELECT v.*,
       ts_rank_cd('textsearch', 'query') AS rank
FROM v_fulltext_search AS v
CROSS JOIN to_tsquery('simple', 'abc:*'::text) AS query
CROSS JOIN to_tsvector('simple', v.searchtext) AS textsearch
WHERE v.user_id = '971acc92-5b1e-4dd4-b177-a0dee7a27c21'::uuid
  AND query @@ textsearch
ORDER BY created_date,
         rank DESC
LIMIT 10
OFFSET 0`;

		expect(sql).to.equal(sqlString);
	});

	it('should be pretty printed when pretty is disabled', function(): void {
		const query: QueryBuilder = select(['v.*', { rank: ts_rank_cd('textsearch', 'query') }])
			.from({ v: 'v_fulltext_search' })
			.crossJoin(to_tsquery('simple', cast('abc:*', DataType.TEXT)), 'query')
			.crossJoin(to_tsvector('simple', 'v.searchtext'), 'textsearch')
			.where(
				and([
					eq('v.user_id', cast('971acc92-5b1e-4dd4-b177-a0dee7a27c21', DataType.UUID)),
					tsvector_matches_tsquery('query', 'textsearch')
				])
			)
			.orderBy(['created_date', { rank: 'DESC' }])
			.limit(10)
			.offset(0);

		const sql: string = query.toSQL({ pretty: false });

		const sqlString: string =
			`SELECT v.*, ts_rank_cd('textsearch', 'query') AS rank` +
			` FROM v_fulltext_search AS v` +
			` CROSS JOIN to_tsquery('simple', 'abc:*'::text) AS query` +
			` CROSS JOIN to_tsvector('simple', v.searchtext) AS textsearch` +
			` WHERE v.user_id = '971acc92-5b1e-4dd4-b177-a0dee7a27c21'::uuid` +
			` AND query @@ textsearch` +
			` ORDER BY created_date, rank DESC` +
			` LIMIT 10` +
			` OFFSET 0`;

		expect(sql).to.equal(sqlString);
	});
});