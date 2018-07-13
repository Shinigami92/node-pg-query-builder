import { expect } from 'chai';
import * as chai from 'chai';
import * as chaiString from 'chai-string';

chai.use(chaiString);

import {
	and,
	between,
	ColumnDefinition,
	DataType,
	exists,
	ge,
	GLOBAL_STAR,
	gt,
	inList,
	isNotNull,
	isNull,
	like,
	notInList,
	or,
	QueryBuilder,
	select,
	TableDefinition
} from '../../src';

class PersonTable extends TableDefinition {
	public readonly firstname: ColumnDefinition = new ColumnDefinition('firstname', DataType.TEXT);
}

const Person: PersonTable = new PersonTable('person');

class CompanyTable extends TableDefinition {
	public readonly name: ColumnDefinition = new ColumnDefinition('name', DataType.TEXT);
	public readonly age: ColumnDefinition = new ColumnDefinition('age', DataType.INTEGER);
	public readonly salary: ColumnDefinition = new ColumnDefinition('salary', DataType.INTEGER);
}

const Company: CompanyTable = new CompanyTable('company');

describe('WhereQueryBuilder', function(): void {
	it('should chain limit', function(): void {
		const query: QueryBuilder = select(Person.firstname)
			.from(Person)
			.where(like(Person.firstname, 'A%'))
			.limit(2);

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal("SELECT firstname FROM person WHERE firstname LIKE 'A%' LIMIT 2")
			.and.to.be.singleLine();
	});

	it('should chain limit and offset', function(): void {
		const query: QueryBuilder = select(Person.firstname)
			.from(Person)
			.where(like(Person.firstname, 'A%'))
			.limit(2)
			.offset(3);

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal("SELECT firstname FROM person WHERE firstname LIKE 'A%' LIMIT 2 OFFSET 3")
			.and.to.be.singleLine();
	});

	it('should return expected result using and and greater equal', function(): void {
		const query: QueryBuilder = select(GLOBAL_STAR)
			.from(Company)
			.where(and([ge(Company.age, 25), ge(Company.salary, 65000)]));

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal('SELECT * FROM company WHERE age >= 25 AND salary >= 65000')
			.and.to.be.singleLine();
	});

	it('should return expected result using or and greater equal', function(): void {
		const query: QueryBuilder = select(GLOBAL_STAR)
			.from(Company)
			.where(or([ge(Company.age, 25), ge(Company.salary, 65000)]));

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal('SELECT * FROM company WHERE age >= 25 OR salary >= 65000')
			.and.to.be.singleLine();
	});

	it('should return expected result using is null', function(): void {
		const query: QueryBuilder = select(GLOBAL_STAR)
			.from(Company)
			.where(isNull(Company.age));

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal('SELECT * FROM company WHERE age IS NULL')
			.and.to.be.singleLine();
	});

	it('should return expected result using is not null', function(): void {
		const query: QueryBuilder = select(GLOBAL_STAR)
			.from(Company)
			.where(isNotNull(Company.age));

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal('SELECT * FROM company WHERE age IS NOT NULL')
			.and.to.be.singleLine();
	});

	it('should return expected result using like', function(): void {
		const query: QueryBuilder = select(GLOBAL_STAR)
			.from(Company)
			.where(like(Company.name, 'Pa%'));

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal("SELECT * FROM company WHERE name LIKE 'Pa%'")
			.and.to.be.singleLine();
	});

	it('should return expected result using in', function(): void {
		const query: QueryBuilder = select(GLOBAL_STAR)
			.from(Company)
			.where(inList(Company.age, [25, 27]));

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal('SELECT * FROM company WHERE age IN (25, 27)')
			.and.to.be.singleLine();
	});

	it('should return expected result using not in', function(): void {
		const query: QueryBuilder = select(GLOBAL_STAR)
			.from(Company)
			.where(notInList(Company.age, [25, 27]));

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal('SELECT * FROM company WHERE age NOT IN (25, 27)')
			.and.to.be.singleLine();
	});

	it('should return expected result using between', function(): void {
		const query: QueryBuilder = select(GLOBAL_STAR)
			.from(Company)
			.where(between(Company.age, 25, 27));

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal('SELECT * FROM company WHERE age BETWEEN 25 AND 27')
			.and.to.be.singleLine();
	});

	it('should return expected result using exists subselect', function(): void {
		const query: QueryBuilder = select(Company.age)
			.from(Company)
			.where(
				exists(
					select(Company.age)
						.from(Company)
						.where(gt(Company.salary, 65000))
				)
			);

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal('SELECT age FROM company WHERE EXISTS (SELECT age FROM company WHERE salary > 65000)')
			.and.to.be.singleLine();
	});

	it('should return expected result using greater than subselect', function(): void {
		const query: QueryBuilder = select(GLOBAL_STAR)
			.from(Company)
			.where(
				gt(
					Company.age,
					select(Company.age)
						.from(Company)
						.where(gt(Company.salary, 65000))
				)
			);

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal('SELECT * FROM company WHERE age > (SELECT age FROM company WHERE salary > 65000)')
			.and.to.be.singleLine();
	});
});
