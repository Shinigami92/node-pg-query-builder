// import { expect } from 'chai';
import * as chai from 'chai';
import * as chaiString from 'chai-string';

chai.use(chaiString);

// import { eq, QueryBuilder, update } from '../../src';

describe('UpdateQueryBuilder', function(): void {
	it(
		'should return expected result' /*, function(): void {
		const query: QueryBuilder = update('company')
			.set({ salary: 15000 })
			.where(eq('id', 3));

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal('UPDATE company SET salary = 15000 WHERE id = 3')
			.and.to.be.singleLine();
	}*/
	);
});
