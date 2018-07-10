# node-pg-query-builder

A QueryBuilder for PostgreSQL written in TypeScript

## Build Status

### Master

[![Build Status](https://travis-ci.org/Shinigami92/node-pg-query-builder.svg?branch=master)](https://travis-ci.org/Shinigami92/node-pg-query-builder)

### Development

[![Build Status](https://travis-ci.org/Shinigami92/node-pg-query-builder.svg?branch=development)](https://travis-ci.org/Shinigami92/node-pg-query-builder)

## How-To

```ts
import { cast, DataType } from '../src/data-types';
import { to_tsquery, to_tsvector, ts_rank_cd, tsvector_matches_tsquery } from '../src/functions/text-search';
import { eq } from '../src/operators/comparison';
import { and } from '../src/operators/logical';
import { QueryBuilder, select } from '../src/select';

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
