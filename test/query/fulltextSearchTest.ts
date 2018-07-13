import { expect } from 'chai';

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
} from '../../src';

class VFulltextSearchTable extends TableDefinition {
	public readonly searchtext: ColumnDefinition = new ColumnDefinition('searchtext', TEXT, this);
	public readonly user_id: ColumnDefinition = new ColumnDefinition('user_id', UUID, this);
	public readonly created_date: ColumnDefinition = new ColumnDefinition('created_date', DATE);
}

const asV: AliasReference = new AliasReference('v');

const VFulltextSearch: VFulltextSearchTable = new VFulltextSearchTable('v_fulltext_search', asV);

const asTextsearch: TsVectorAliasReference = new TsVectorAliasReference('textsearch');
const asQuery: TsQueryAliasReference = new TsQueryAliasReference('query');
const asRank: AliasReference = new AliasReference('rank');

describe('FulltextSearch', function(): void {
	it('should be pretty printed when pretty is enabled', function(): void {
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

		const sql: string = query.toSQL({ pretty: true });

		const sqlString: string = `SELECT v.*,
       ts_rank_cd(textsearch, query) AS rank
FROM v_fulltext_search AS v
CROSS JOIN to_tsquery('simple', 'abc:*'::text) AS query
CROSS JOIN to_tsvector('simple', v.searchtext) AS textsearch
WHERE v.user_id = '971acc92-5b1e-4dd4-b177-a0dee7a27c21'::uuid
  AND textsearch @@ query
ORDER BY created_date,
         rank DESC
LIMIT 10
OFFSET 0`;

		expect(sql).to.equal(sqlString);
	});

	it('should be pretty printed when pretty is disabled', function(): void {
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

		const sql: string = query.toSQL({ pretty: false });

		const sqlString: string =
			'SELECT v.*, ts_rank_cd(textsearch, query) AS rank' +
			' FROM v_fulltext_search AS v' +
			" CROSS JOIN to_tsquery('simple', 'abc:*'::text) AS query" +
			" CROSS JOIN to_tsvector('simple', v.searchtext) AS textsearch" +
			" WHERE v.user_id = '971acc92-5b1e-4dd4-b177-a0dee7a27c21'::uuid" +
			' AND textsearch @@ query' +
			' ORDER BY created_date, rank DESC' +
			' LIMIT 10' +
			' OFFSET 0';

		expect(sql).to.equal(sqlString);
	});
});
