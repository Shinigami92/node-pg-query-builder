import { expect } from 'chai';
import {
	AliasReference,
	avg,
	BIGINT,
	cast,
	ColumnDefinition,
	count,
	eq,
	max,
	min,
	NUMERIC,
	NumericType,
	QueryBuilder,
	select,
	TableDefinition,
	TEXT
} from '../../src';

class BuyTable extends TableDefinition {
	public readonly price: ColumnDefinition = new ColumnDefinition('price', NUMERIC, this);
	public readonly location_id: ColumnDefinition = new ColumnDefinition('location_id', BIGINT, this);
	public readonly commodity_id: ColumnDefinition = new ColumnDefinition('commodity_id', NUMERIC, this);
}

class LocationTable extends TableDefinition {
	public readonly id: ColumnDefinition = new ColumnDefinition('id', BIGINT, this);
	public readonly name: ColumnDefinition = new ColumnDefinition('name', TEXT, this);
}

class CommodityTable extends TableDefinition {
	public readonly id: ColumnDefinition = new ColumnDefinition('id', BIGINT, this);
	public readonly name: ColumnDefinition = new ColumnDefinition('name', TEXT, this);
	public readonly category: ColumnDefinition = new ColumnDefinition('category', TEXT, this);
}

const asB: AliasReference = new AliasReference('b');
const Buy: BuyTable = new BuyTable('buy', asB);

const asC: AliasReference = new AliasReference('c');
const Commodity: CommodityTable = new CommodityTable('commodity', asC);

const asL: AliasReference = new AliasReference('l');
const Location: LocationTable = new LocationTable('location', asL);

const asCommodityName: AliasReference = new AliasReference('commodity_name');
const asCommodityCategory: AliasReference = new AliasReference('commodity_category');
const asLocationName: AliasReference = new AliasReference('location_name');
const asMinPrice: AliasReference = new AliasReference('min_price');
const asMaxPrice: AliasReference = new AliasReference('max_price');
const asAvgPrice: AliasReference = new AliasReference('avg_price');
const asPriceMeasureCount: AliasReference = new AliasReference('price_measure_count');

const NUMERIC_8_3: NumericType = new NumericType(8, 3);

describe('CustomTest', function(): void {
	it('should be correct', function(): void {
		const query: QueryBuilder = select(
			[Commodity.name, asCommodityName],
			[Commodity.category, asCommodityCategory],
			[Location.name, asLocationName],
			[cast(min(Buy.price), NUMERIC_8_3), asMinPrice],
			[cast(max(Buy.price), NUMERIC_8_3), asMaxPrice],
			[cast(avg(Buy.price), NUMERIC_8_3), asAvgPrice],
			[count(Buy.price), asPriceMeasureCount]
		)
			.from(Buy)
			.join(Location, eq(Location.id, Buy.location_id))
			.join(Commodity, eq(Commodity.id, Buy.commodity_id))
			.groupBy(Location.name, Commodity.name, Commodity.category)
			.orderBy(Commodity.name, Location.name);

		const sql: string = query.toSQL({ pretty: true });

		const sqlString: string = `SELECT c.name AS commodity_name,
       c.category AS commodity_category,
       l.name AS location_name,
       min(b.price)::numeric(8, 3) AS min_price,
       max(b.price)::numeric(8, 3) AS max_price,
       avg(b.price)::numeric(8, 3) AS avg_price,
       count(b.price) AS price_measure_count
FROM buy AS b
INNER JOIN location AS l ON l.id = b.location_id
INNER JOIN commodity AS c ON c.id = b.commodity_id
GROUP BY l.name,
         c.name,
         c.category
ORDER BY c.name,
         l.name`;

		expect(sql).to.equal(sqlString);
	});
});
