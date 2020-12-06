import { ParserError } from '../error/ParserError';
import { Source } from '../interface/Source';
import { Parser } from './Parser';

/**
 * Customizes the error message.
 * 
 * @param TargetParser The target parser.
 * @param message Error message.
 */
export function CustomErrorParser<TSource extends Source, TObject>(TargetParser: Parser<TSource, TObject>, message: string) {
    return Parser<TSource, TObject>((state) => {
        try {
            return TargetParser(state);
        } catch (error) {
            if (error instanceof ParserError) {
                error.message = message;
            }
            throw error;
        }
    });
}
