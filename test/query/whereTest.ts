import { expect } from 'chai';
import * as chai from 'chai';
import * as chaiString from 'chai-string';

chai.use(chaiString);

import { and, ge, QueryBuilder, select } from '../../src';

describe('WhereQueryBuilder', function(): void {
	it('should return expected result and single line', function(): void {
		const query: QueryBuilder = select('*')
			.from('company')
			.where(and([ge('age', 25), ge('salary', 65000)]));

		const sql: string = query.toSQL();

		expect(sql)
			.to.equal('SELECT * FROM company WHERE age >= 25 AND salary >= 65000')
			.and.to.be.singleLine();
	});
});
