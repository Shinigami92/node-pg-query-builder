import { QueryBuilder, select } from '../src/select';

const query: QueryBuilder = select('firstname').from('person');

const sql: string = query.toSQL();

const sqlString: string = `SELECT firstname FROM person`;

console.log('Actual:', sql);
console.log('Expected:', sqlString);
console.log('Equals:', sql === sqlString);
console.log();
