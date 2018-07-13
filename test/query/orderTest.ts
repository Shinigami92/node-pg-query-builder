import { expect } from 'chai';
import * as chai from 'chai';
import * as chaiString from 'chai-string';

chai.use(chaiString);

import { ColumnDefinition, DataType, like, QueryBuilder, select, TableDefinition } from '../../src';

class PersonTable extends TableDefinition {
	public readonly firstname: ColumnDefinition = new ColumnDefinition('firstname', DataType.TEXT);
}

const Person: PersonTable = new PersonTable('person');

describe('OrderQueryBuilder', function(): void {
	it('should chain limit', function(): void {
		const query: QueryBuilder = select(Person.firstname)
			.from(Person)
			.where(like(Person.firstname, 'A%'))
			.orderBy([Person.firstname, 'ASC'])
			.limit(2);

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal("SELECT firstname FROM person WHERE firstname LIKE 'A%' ORDER BY firstname ASC LIMIT 2")
			.and.to.be.singleLine();
	});

	it('should chain limit and offset', function(): void {
		const query: QueryBuilder = select(Person.firstname)
			.from(Person)
			.where(like(Person.firstname, 'A%'))
			.orderBy([Person.firstname, 'ASC'])
			.limit(2)
			.offset(3);

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal("SELECT firstname FROM person WHERE firstname LIKE 'A%' ORDER BY firstname ASC LIMIT 2 OFFSET 3")
			.and.to.be.singleLine();
	});
});
