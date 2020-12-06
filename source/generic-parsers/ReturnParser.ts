import { Source } from '../interface/Source';
import { Parser } from './Parser';

/**
 * Returns a constant object.
 * 
 * @param expected The expected string.
 * @param ignoreCase Ignores case if true.
 */
export function ReturnParser<TSource extends Source, TObject>(TargetParser: Parser<TSource, TObject>, object: TObject) {
    return Parser<TSource, TObject>((state) => {
        const result = TargetParser(state);
        return {
            state: result.state,
            object: object,
        };
    });
}
