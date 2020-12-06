import { NormalParserError } from '../error/NormalParserError';
import { Source } from '../interface/Source';
import { Parser } from './Parser';

/**
 * Returns a specified default object instead of raising an error if the inner parser fails.
 * 
 * @param TargetParser The target parser.
 * @param def The default object.
 */
export function OptionalParser<TSource extends Source, TObject>(TargetParser: Parser<TSource, TObject>, def: TObject) {
    return Parser<TSource, TObject>((state) => {
        try {
            return TargetParser(state);
        } catch (error) {
            if (error instanceof NormalParserError) {
                return {
                    state: state,
                    object: def,
                };
            }
            throw error;
        }
    });
}
