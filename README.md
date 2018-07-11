# node-pg-query-builder

A QueryBuilder for PostgreSQL written in TypeScript

## Build Status

[![GitHub version](https://badge.fury.io/gh/Shinigami92%2Fnode-pg-query-builder.svg)](https://badge.fury.io/gh/Shinigami92%2Fnode-pg-query-builder)

### Master

[![Build Status](https://travis-ci.org/Shinigami92/node-pg-query-builder.svg?branch=master)](https://travis-ci.org/Shinigami92/node-pg-query-builder)

### Development

[![Build Status](https://travis-ci.org/Shinigami92/node-pg-query-builder.svg?branch=development)](https://travis-ci.org/Shinigami92/node-pg-query-builder)

## How-To

```ts
import {
	and,
	cast,
	DataType,
	eq,
	QueryBuilder,
	select,
	ts_rank_cd,
	to_tsquery,
	to_tsvector,
	tsvector_matches_tsquery
} from 'pg-query-builder';

const searchTerm: string = 'abc:*';

const query: QueryBuilder = select(['v.*', { rank: ts_rank_cd('textsearch', 'query') }])
	.from({ v: 'v_fulltext_search' })
	.crossJoin(to_tsquery('simple', cast(searchTerm, DataType.TEXT)), 'query')
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

const sql: string = query.toSQL({
	pretty: true,
	semicolon: true
});
```

Result:

```sql
SELECT v.*, ts_rank_cd('textsearch', 'query') AS rank
FROM v_fulltext_search AS v
CROSS JOIN to_tsquery('simple', 'abc:*'::text) AS query
CROSS JOIN to_tsvector('simple', v.searchtext) AS textsearch
WHERE v.user_id = '971acc92-5b1e-4dd4-b177-a0dee7a27c21'::uuid
AND query @@ textsearch
ORDER BY created_date, rank DESC
LIMIT 10
OFFSET 0;
```
