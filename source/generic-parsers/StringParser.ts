import { NormalParserError } from '../error/NormalParserError';
import { Parser } from './Parser';

/**
 * Reads a constant string.
 * 
 * @param expected The expected string.
 * @param ignoreCase Ignores case if true.
 */
export function StringParser(expected: string, ignoreCase: boolean = false) {
    return Parser<string, string>((state) => {
        const remainderCased = ignoreCase ? state.remainder.toUpperCase() : state.remainder;
        const expectedCased = ignoreCase ? expected.toUpperCase() : expected;
        const actualCased = remainderCased.slice(0, expectedCased.length);

        if (actualCased === expectedCased) {
            return {
                state: state.step(actualCased.length),
                object: state.remainder.slice(0, actualCased.length),
            };
        }

        throw new NormalParserError(state, `Expected '${expectedCased}'`);
    });
}
