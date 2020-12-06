import { CharacterParser } from '../generic-parsers/CharacterParser';
import { PatternParser } from '../generic-parsers/PatternParser';

export const LetterParser = PatternParser(/[a-z]/i);
