import { FatalParserError } from '../error/FatalParserError';
import { NormalParserError } from '../error/NormalParserError';
import { Source } from '../interface/Source';
import { Parser } from './Parser';

/**
 * Changes the error class from NormalParserError to FatalParserError.
 * See FatalParserError for more details.
 * 
 * @param TargetParser The target parser.
 */
export function FatalizeParser<TSource extends Source, TObject>(TargetParser: Parser<TSource, TObject>) {
    return Parser<TSource, TObject>((state) => {
        try {
            return TargetParser(state);
        } catch (error) {
            if (error instanceof NormalParserError) {
                throw new FatalParserError(error.state, error.message);
            }
            throw error;
        }
    });
}
