import { Source } from '../interface/Source';
import { Parser } from './Parser';

/**
 * Sets a label for SequenceParser, etc.
 */
export function LabelParser<TSource extends Source, TObject>(TargetParser: Parser<TSource, TObject>, label: string) {
    TargetParser.label = label;
    return TargetParser;
}
