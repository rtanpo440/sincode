import { NormalParserError } from '../error/NormalParserError';
import { Source } from '../interface/Source';
import { Parser } from './Parser';

/**
 * Returns the result of a parser succeeded first.
 * 
 * @param choices The expected parsers.
 */
export function ChoiceParser<TSource extends Source, TObject>(choices: Parser<TSource, TObject>[]) {
    return Parser<TSource, TObject>((state) => {
        let messages: string[] = [];

        for (const TargetParser of choices) {
            try {
                return TargetParser(state);
            } catch (error) {
                messages.push(error.toString())
                if (error instanceof NormalParserError) {
                    continue;
                }
                throw error;
            }
        }

        throw new NormalParserError(state, messages.join(' '));
    });
}
