import { NormalParserError } from '../error/NormalParserError';
import { Source } from '../interface/Source';
import { Parser } from './Parser';

/**
 * Reads something multiple times.
 * 
 * @param TargetParser The target parser.
 * @param minimum Minimum times. Defaults to 1.
 * @param maximum Maximum times. 0 means no limit. Defaults to the same as minimum.
 */
export function RepeatParser<TSource extends Source, TObject>(TargetParser: Parser<TSource, TObject>, minimum: number = 1, maximum: number = minimum) {
    return Parser<TSource, TObject[]>((originalState) => {
        const objects: TObject[] = [];
        let currentState = originalState;

        for (let count = 0; maximum ? count < maximum : true; count++) {
            try {
                const result = TargetParser(currentState);
                objects.push(result.object);
                currentState = result.state;
            } catch (error) {
                if (error instanceof NormalParserError) {
                    if (count < minimum) {
                        throw new NormalParserError(currentState, `${error.message} at least ${minimum} time(s)`);
                    }
                    break;
                }
                throw error;
            }
        }

        return {
            state: currentState,
            object: objects,
        }
    });
}
