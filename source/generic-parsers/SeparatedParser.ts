import { FatalParserError } from '../error/FatalParserError';
import { NormalParserError } from '../error/NormalParserError';
import { Source } from '../interface/Source';
import { Parser } from './Parser';

/**
 * Reads the separated items.
 * 
 * @param itemParser The parser reads an item.
 * @param separatorParser The parser reads a separator.
 */
export function SeparatedParser<TSource extends Source, TObject>(itemParser: Parser<TSource, TObject>, separatorParser: Parser<TSource, any>) {
    return Parser<TSource, TObject[]>((state) => {
        const items: TObject[] = [];
        let item = itemParser(state);

        for (;;) {
            try {
                items.push(item.object);
                let separator = separatorParser(item.state);
                item = itemParser(separator.state);
            } catch (error) {
                if ((error instanceof NormalParserError) && !(error instanceof FatalParserError)) {
                    break;
                }
                throw error;
            }
        }

        return {
            state: item.state,
            object: items,
        };
    });
}
