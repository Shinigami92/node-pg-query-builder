import { expect } from 'chai';
import * as chai from 'chai';
import * as chaiString from 'chai-string';

chai.use(chaiString);

import { AliasReference, ColumnDefinition, QueryBuilder, QueryConfig, select, TableDefinition, TEXT } from '../../src';

class PersonTable extends TableDefinition {
	public readonly firstname: ColumnDefinition = new ColumnDefinition('firstname', TEXT);
}

const Person: PersonTable = new PersonTable('person');

describe('FromQueryBuilder', function(): void {
	describe('toSQL', function(): void {
		it('should return single line when pretty is disabled', function(): void {
			const query: QueryBuilder = select(Person.firstname).from(Person);

			const sql: string = query.toSQL();

			expect(sql)
				.to.equal('SELECT firstname FROM person')
				.and.to.be.singleLine();
		});

		it('should chain limit', function(): void {
			const query: QueryBuilder = select(Person.firstname)
				.from(Person)
				.limit(2);

			const sql: string = query.toSQL();

			expect(sql)
				.to.equal('SELECT firstname FROM person LIMIT 2')
				.and.to.be.singleLine();
		});

		it('should chain limit and offset', function(): void {
			const query: QueryBuilder = select(Person.firstname)
				.from(Person)
				.limit(2)
				.offset(3);

			const sql: string = query.toSQL();

			expect(sql)
				.to.equal('SELECT firstname FROM person LIMIT 2 OFFSET 3')
				.and.to.be.singleLine();
		});
	});

	describe('toQuery', function(): void {
		it('should return single line when pretty is disabled', function(): void {
			const query: QueryBuilder = select(Person.firstname).from(Person);

			const queryConfig: QueryConfig = query.toQuery();

			expect(queryConfig).to.deep.equal({ text: 'SELECT firstname FROM person' });
			expect(queryConfig.text).to.be.singleLine();
		});

		it('should chain limit', function(): void {
			const query: QueryBuilder = select(Person.firstname)
				.from(Person)
				.limit(2);

			const queryConfig: QueryConfig = query.toQuery();

			expect(queryConfig).to.deep.equal({ text: 'SELECT firstname FROM person LIMIT 2' });
			expect(queryConfig.text).to.be.singleLine();
		});

		it('should chain limit and offset', function(): void {
			const query: QueryBuilder = select(Person.firstname)
				.from(Person)
				.limit(2)
				.offset(3);

			const queryConfig: QueryConfig = query.toQuery();

			expect(queryConfig).to.deep.equal({ text: 'SELECT firstname FROM person LIMIT 2 OFFSET 3' });
			expect(queryConfig.text).to.be.singleLine();
		});

		it('should outsource the variables into values', function(): void {
			const aStringAlias: AliasReference = new AliasReference('a_string');
			const aNumberAlias: AliasReference = new AliasReference('a_number');
			const aBooleanAlias: AliasReference = new AliasReference('a_bool');
			const query: QueryBuilder = select(
				Person.firstname,
				['Hello World!', aStringAlias],
				[42, aNumberAlias],
				[true, aBooleanAlias]
			).from(Person);

			const queryConfig: QueryConfig = query.toQuery();

			expect(queryConfig).to.deep.equal({
				text: 'SELECT firstname, $1 AS a_string, $2 AS a_number, $3 AS a_bool FROM person',
				values: ['Hello World!', 42, true]
			});
			expect(queryConfig.text).to.be.singleLine();
		});
	});
});
