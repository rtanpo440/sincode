import { Result } from '../interface/Result';
import { Source } from '../interface/Source';
import { State } from '../interface/State';

/**
 * The Parser interface represents a function that parses and returns the result according to a
 * specific rule.
 * 
 * The Parser function creates a custom parser from a function. This creates a copied function from
 * the original function to restore the original state if parsing fails. Use this to create a
 * custom parser.
 * 
 * The function should raise an error if parsing fails.
 */
export interface Parser<TSource extends Source, TObject> {
    (state: State<TSource>): Result<TSource, TObject>;
    label?: string;
}

/**
 * @param CustomParser The parser function.
 */
export function Parser<TSource extends Source, TObject>(CustomParser: Parser<TSource, TObject>): Parser<TSource, TObject> {
    return (currentState) => {
        const originalState = Object.assign({}, currentState);
        try {
            const result = CustomParser(currentState);
            return result;
        } catch (error) {
            Object.assign(currentState, originalState);
            throw error;
        }
    };
}
