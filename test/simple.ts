import { FromQueryBuilder, select } from '../src/select';

const query: FromQueryBuilder = select('firstname').from('person');

const sql: string = query.toSQL();

const sqlString: string = `SELECT firstname FROM person`;

console.log(sql);
console.log(sql === sqlString);
