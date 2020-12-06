import { NormalParserError } from '../error/NormalParserError';
import { Parser } from './Parser';

/**
 * Reads a string matching a specified pattern.
 * 
 * @param expected The expected pattern.
 */
export function PatternParser(expected: RegExp) {
    return Parser<string, string>((state) => {
        const match = state.remainder.match(expected);

        if (match && match.index == 0) {
            return {
                state: state.step(match[0].length),
                object: match[0],
            };
        }

        throw new NormalParserError(state, `Expected /${expected.source}/`);
    });
}
