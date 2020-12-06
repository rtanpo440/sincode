import { NormalParserError } from '../error/NormalParserError';
import { Parser } from './Parser';

/**
 * Reads a character.
 * 
 * @param expected The expected characters.
 * @param ignoreCase Ignores case if true.
 */
export function CharacterParser(expected: string[], ignoreCase: boolean = false) {
    return Parser<string, string>((state) => {
        const remainderCased = (ignoreCase) ? state.remainder.toUpperCase() : state.remainder;
        const expectedCased = (ignoreCase) ? expected.map(character => character.toUpperCase()) : expected;
        const actualCased = remainderCased[0];

        if (expectedCased.includes(actualCased)) {
            return {
                state: state.step(actualCased.length),
                object: state.remainder.slice(0, actualCased.length),
            };
        }

        throw new NormalParserError(state, `Expected ${expected.map(character => `'${character}'`).join(', ')}`);
    });
}
