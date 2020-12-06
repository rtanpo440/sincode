import { CenterParser } from './CenterParser';
import { Parser } from './Parser';
import { PatternParser } from './PatternParser';

/**
 * Trims heading or trailing spaces.
 * 
 * @param TargetParser The target parser.
 * @param spacePattern The space pattern (optional)
 */
export function TrimmedParser<TObject>(TargetParser: Parser<string, TObject>, spacePattern: RegExp = / */) {
    return CenterParser(
        PatternParser(spacePattern),
        TargetParser,
        PatternParser(spacePattern),
    );
}
