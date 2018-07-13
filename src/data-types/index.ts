export { DataType } from './data-type';
export { TEXT, TextType } from './character-types/text-type';
export { INTEGER, IntegerType } from './numeric-types/integer-types/integer-type';
export { DATE, DateType } from './time-types/date-type';
export { UUID, UuidType } from './uuid-type';

import { Cast } from './cast';
import { DataType } from './data-type';
export const cast: (value: string, type: DataType) => Cast = Cast.cast;
