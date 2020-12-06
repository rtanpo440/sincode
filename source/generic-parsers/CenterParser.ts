import { Source } from '../interface/Source';
import { Parser } from './Parser';

/**
 * CenterParser(a, b, c) reads a, b, and then c, and returns the result of b.
 * 
 * @param leftParser The target parser.
 * @param def The default object.
 */
export function CenterParser<TSource extends Source, TObject>(leftParser: Parser<TSource, any>, centerParser: Parser<TSource, TObject>, rightParser: Parser<TSource, any>) {
    return Parser<TSource, TObject>((state) => {
        const left = leftParser(state);
        const center = centerParser(left.state);
        const right = rightParser(center.state);

        return {
            ...center,
            state: right.state,
        };
    });
}
