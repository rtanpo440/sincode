import { Source } from './Source';

/**
 * The State object stores the state of the parsing: the original source, the rest of it, and the current position.
 */
export interface State<T extends Source> {
    /**
     * The original full input.
     */
    source: T;

    /**
     * The remaining of the source minus the parsed portion.
     */
    remainder: T;

    /**
     * The current position.
     */
    position: number;

    /**
     * Creates a State object that represents the position incremented the specified amount.
     * 
     * @param amount the amount to step.
     */
    step(amount: number): State<T>;
}

/**
 * @param source The input.
 * @param position The initial position. Defaults to 0.
 */
export function State<T extends Source>(source: T, position: number = 0): State<T> {
    const remainder = source.slice(position);
    return {
        source: source,
        remainder: remainder as T,
        position: position,
        step(amount: number) {
            return State(source, position + amount);
        },
    };
}
