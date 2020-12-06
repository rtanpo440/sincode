import { RepeatParser } from '../generic-parsers/RepeatParser';
import { LetterParser } from './LetterParser';

export const LettersParser = RepeatParser(LetterParser);
