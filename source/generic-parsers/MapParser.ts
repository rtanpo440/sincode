import { Source } from '../interface/Source';
import { Parser } from './Parser';

/**
 * Converts the object read.
 * 
 * @param expected The expected string.
 * @param ignoreCase Ignores case if true.
 */
export function MapParser<TSource extends Source, TInObject, TOutObject>(TargetParser: Parser<TSource, TInObject>, processor: (object: TInObject) => TOutObject) {
    return Parser<TSource, TOutObject>((state) => {
        const result = TargetParser(state);
        return {
            state: result.state,
            object: processor(result.object),
        };
    });
}
