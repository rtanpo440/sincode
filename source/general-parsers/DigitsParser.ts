import { RepeatParser } from '../generic-parsers/RepeatParser';
import { DigitParser } from './DigitParser';

export const DigitsParser = RepeatParser(DigitParser);
