import { ParserError } from './ParserError';

/**
 * Represents a fatal parser error, such as a missing parenthesis.
 * 
 * ChooseParser, OptionalParser, etc treat this error as a complete failure.
 */
export class FatalParserError extends ParserError { }
