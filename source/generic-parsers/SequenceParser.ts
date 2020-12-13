import { NormalParserError } from '../error/NormalParserError';
import { Result } from '../interface/Result';
import { Source } from '../interface/Source';
import { Parser } from './Parser';

/**
 * Reads all specified parsers in order.
 * 
 * @param parsers The target parsers.
 */
export function SequenceParser<TSource extends Source, TObject>(parsers: Parser<TSource, TObject>[]) {
    return Parser<TSource, {[label: string]: TObject}>((state) => {
        const results: Result<TSource, {[label: string]: TObject}> = {
            state: state,
            object: {},
        };
        let i = 0;
        for (const parser of parsers) {
            const result = parser(results.state);
            results.state = result.state;
            results.object[parser.label ?? i] = result.object;
            i++;
        }
        return results;
    });
}
