import { Source } from './Source';
import { State } from './State';

/**
 * Stores a result of parsing.
 */
export interface Result<TSource extends Source, TObject> {
    /**
     * The remaining of the input.
     */
    state: State<TSource>;

    /**
     * The object read from the input.
     */
    object: TObject;
}
