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

## Status of the project

The project is currently under construction

Following needs to be implemented for 1.0.0:

-   [x] Some missing comparison operators
-   [ ] Missing DataTypes
-   [x] Implement joins
    -   [x] CROSS JOIN
    -   [x] INNER JOIN
    -   [x] LEFT JOIN
    -   [x] RIGHT JOIN
-   [ ] Test coverage close to 100%
-   [ ] TypeDocs

Planned for the future:

-   1.1.0
    -   Mutable QueryBuilders (INSERT, UPDATE, DELETE)
-   1.2.0
    -   Window Functions
-   Backlog
    -   Having
    -   Union
    -   Distinct
    -   Mathematical Functions and Operators
    -   String Functions and Operators
    -   JSON Functions and Operators
    -   ...

## How-To

```ts
import { Client } from 'pg';
import {
	AliasReference,
	and,
	cast,
	ColumnDefinition,
	DATE,
	eq,
	QueryBuilder,
	RegConfig,
	select,
	TableDefinition,
	TEXT,
	to_tsquery,
	to_tsvector,
	ts_rank_cd,
	TsQueryAliasReference,
	tsvector_matches_tsquery,
	TsVectorAliasReference,
	UUID
} from 'pg-query-builder';

// Create a meta-model that defines your table
class VFulltextSearchTable extends TableDefinition {
	public readonly searchtext: ColumnDefinition = new ColumnDefinition('searchtext', TEXT, this);
	public readonly user_id: ColumnDefinition = new ColumnDefinition('user_id', UUID, this);
	public readonly created_date: ColumnDefinition = new ColumnDefinition('created_date', DATE);
}

// Maybe you want aliases for prettier SQL
const asV: AliasReference = new AliasReference('v');

const VFulltextSearch: VFulltextSearchTable = new VFulltextSearchTable('v_fulltext_search', asV);

const asTextsearch: TsVectorAliasReference = new TsVectorAliasReference('textsearch');
const asQuery: TsQueryAliasReference = new TsQueryAliasReference('query');
const asRank: AliasReference = new AliasReference('rank');

// Build the query
const query: QueryBuilder = select(VFulltextSearch.__star, [ts_rank_cd(asTextsearch, asQuery), asRank])
	.from(VFulltextSearch)
	.crossJoin(to_tsquery(RegConfig.SIMPLE, cast('abc:*', TEXT)), asQuery)
	.crossJoin(to_tsvector(RegConfig.SIMPLE, VFulltextSearch.searchtext), asTextsearch)
	.where(
		and([
			eq(VFulltextSearch.user_id, cast('971acc92-5b1e-4dd4-b177-a0dee7a27c21', UUID)),
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
const client = new Client(dbConfig);
client.query(queryConfig);
```

Result:

```sql
SELECT v.*,
       ts_rank_cd(textsearch, query) AS rank
FROM v_fulltext_search AS v
CROSS JOIN to_tsquery('simple', 'abc:*'::text) AS query
CROSS JOIN to_tsvector('simple', v.searchtext) AS textsearch
WHERE v.user_id = '971acc92-5b1e-4dd4-b177-a0dee7a27c21'::uuid
  AND textsearch @@ query
ORDER BY created_date,
         rank DESC
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
