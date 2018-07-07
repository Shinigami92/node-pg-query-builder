import { expect } from 'chai';

import { select } from '../../src/query';
import { QueryBuilder } from '../../src/query/query';

describe('FromQueryBuilder', function(): void {
	it('should return single line when pretty is disabled', function(): void {
		const query: QueryBuilder = select('firstname').from('person');

		const sql: string = query.toSQL();

		expect(sql).to.equal('SELECT firstname FROM person');
	});
});
