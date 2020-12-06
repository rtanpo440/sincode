import { NormalParserError } from '../error/NormalParserError';
import { Source } from '../interface/Source';
import { Parser } from './Parser';

/**
 * Reads an instance.
 * 
 * @param expected The expected constructor.
 */
export function ObjectParser<TSource extends Source>(constructor: Function) {
    return Parser<TSource, Object>((state) => {
        if (state.remainder[0] instanceof constructor) {
            return {
                state: state.step(1),
                object: state.remainder[0],
            };
        }

        throw new NormalParserError(state, `Expected ${constructor.name}`);
    });
}
