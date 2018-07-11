import { expect } from 'chai';
import * as chai from 'chai';
import * as chaiString from 'chai-string';

chai.use(chaiString);

import { and, between, exists, ge, gt, inList, isNotNull, like, notInList, or, QueryBuilder, select } from '../../src';

describe('WhereQueryBuilder', function(): void {
	it('should return expected result using and and greater equal', function(): void {
		const query: QueryBuilder = select('*')
			.from('company')
			.where(and([ge('age', 25).resolve(), ge('salary', 65000).resolve()]));

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal('SELECT * FROM company WHERE age >= 25 AND salary >= 65000')
			.and.to.be.singleLine();
	});

	it('should return expected result using or and greater equal', function(): void {
		const query: QueryBuilder = select('*')
			.from('company')
			.where(or([ge('age', 25).resolve(), ge('salary', 65000).resolve()]));

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal('SELECT * FROM company WHERE age >= 25 OR salary >= 65000')
			.and.to.be.singleLine();
	});

	it('should return expected result using is not null', function(): void {
		const query: QueryBuilder = select('*')
			.from('company')
			.where(isNotNull('age').resolve());

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal('SELECT * FROM company WHERE age IS NOT NULL')
			.and.to.be.singleLine();
	});

	it('should return expected result using like', function(): void {
		const query: QueryBuilder = select('*')
			.from('company')
			.where(like('name', 'Pa%').resolve());

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal("SELECT * FROM company WHERE name LIKE 'Pa%'")
			.and.to.be.singleLine();
	});

	it('should return expected result using in', function(): void {
		const query: QueryBuilder = select('*')
			.from('company')
			.where(inList('age', [25, 27]).resolve());

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal('SELECT * FROM company WHERE age IN (25, 27)')
			.and.to.be.singleLine();
	});

	it('should return expected result using not in', function(): void {
		const query: QueryBuilder = select('*')
			.from('company')
			.where(notInList('age', [25, 27]).resolve());

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal('SELECT * FROM company WHERE age NOT IN (25, 27)')
			.and.to.be.singleLine();
	});

	it('should return expected result using between', function(): void {
		const query: QueryBuilder = select('*')
			.from('company')
			.where(between('age', 25, 27).resolve());

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal('SELECT * FROM company WHERE age BETWEEN 25 AND 27')
			.and.to.be.singleLine();
	});

	it('should return expected result using exists subselect', function(): void {
		const query: QueryBuilder = select('age')
			.from('company')
			.where(
				exists(
					select('age')
						.from('company')
						.where(gt('salary', 65000).resolve())
				).resolve()
			);

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal('SELECT age FROM company WHERE EXISTS (SELECT age FROM company WHERE salary > 65000)')
			.and.to.be.singleLine();
	});

	it('should return expected result using greater than subselect', function(): void {
		const query: QueryBuilder = select('*')
			.from('company')
			.where(
				gt(
					'age',
					select('age')
						.from('company')
						.where(gt('salary', 65000).resolve())
				).resolve()
			);

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal('SELECT * FROM company WHERE age > (SELECT age FROM company WHERE salary > 65000)')
			.and.to.be.singleLine();
	});
});
