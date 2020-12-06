import lineColumn from 'line-column';
import { Source } from '../interface/Source';
import { State } from '../interface/State';

/**
 * Base class for parser errors.
 */
export class ParserError extends Error {
    public state: State<Source>;

    public constructor(state: State<Source>, message: string) {
        const source = (typeof state.source === 'string') ? (state.source + ' ') : '';
        const { line, col } = lineColumn(source).fromIndex(state.position) ?? {
            line: NaN,
            col: NaN,
        };
        super(`${message}${(!isNaN(line) && !isNaN(col)) ? ` in line ${line} column ${col}` : ``}`);
        this.state = state;
    }
}
