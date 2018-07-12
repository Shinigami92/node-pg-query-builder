# node-pg-query-builder

[![Build Status](https://travis-ci.org/Shinigami92/node-pg-query-builder.svg)](https://travis-ci.org/Shinigami92/node-pg-query-builder)
[![dependencies Status](https://david-dm.org/Shinigami92/node-pg-query-builder/status.svg)](https://david-dm.org/Shinigami92/node-pg-query-builder)
[![devDependencies Status](https://david-dm.org/Shinigami92/node-pg-query-builder/dev-status.svg)](https://david-dm.org/Shinigami92/node-pg-query-builder?type=dev)
[![GitHub version](https://badge.fury.io/gh/Shinigami92%2Fnode-pg-query-builder.svg)](https://badge.fury.io/gh/Shinigami92%2Fnode-pg-query-builder)

A QueryBuilder for PostgreSQL written in TypeScript

## Install

### npm

```sh
$ npm install --save @shinigami92/pg-query-builder
```

---

## How-To

```ts
import { Client } from 'pg';
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

const VFulltextSearch = new TableDefinition();
VFulltextSearch.defineColumn('created_date', DataType.DATE);
VFulltextSearch.defineColumn('searchtext', DataType.TEXT);
VFulltextSearch.defineColumn('user_id', DataType.UUID);

const asTextsearch = new AliasReference('textsearch');
const asQuery = new AliasReference('query');
const asRank = new AliasReference('rank');

const query: QueryBuilder = select(VFulltextSearch.__star, [ts_rank_cd(asTextsearch, asQuery), asRank])
	.from(VFulltextSearch)
	.crossJoin(to_tsquery(RegConfig.SIMPLE, cast('abc:*', DataType.TEXT)), asQuery)
	.crossJoin(to_tsvector(RegConfig.SIMPLE, VFulltextSearch.searchtext), asTextsearch)
	.where(
		and([
			eq(VFulltextSearch.user_id, '971acc92-5b1e-4dd4-b177-a0dee7a27c21'),
			tsvector_matches_tsquery(asTextsearch, asQuery)
		])
	)
	.orderBy(VFulltextSearch.created_date, [asRank, 'DESC'])
	.limit(10)
	.offset(0);

// To SQL-String
const sql: string = query.toSQL({ pretty: true, semicolon: true });

// Using pg
const queryConfig: QueryConfig = query.toQuery();
const client = new Client /* config */();
client.query(queryConfig);
```

Result:

```sql
SELECT v.*, ts_rank_cd(textsearch, query) AS rank
FROM v_fulltext_search AS v
CROSS JOIN to_tsquery('simple', 'abc:*'::text) AS query
CROSS JOIN to_tsvector('simple', v.searchtext) AS textsearch
WHERE v.user_id = '971acc92-5b1e-4dd4-b177-a0dee7a27c21'::uuid
AND query @@ textsearch
ORDER BY created_date, rank DESC
LIMIT 10
OFFSET 0;
```

## Why?

-   JSDoc - Move the mouse pointer over a function and get corresponding PostgreSQL specific explanation
-   Big projects with multiple members get better overview
-   Easier refactoring
-   Typesafe - Autocast to PostgreSQL data types or early interception if the data type is incompatible
-   Autocomplete - See what you can pass into a Where, OrderBy or Compare function

## License

[MIT License](LICENSE) - 2018 Christopher Quadflieg
