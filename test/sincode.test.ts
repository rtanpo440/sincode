import s from '../source';

function parse<TSource extends s.Source, TObject>(parser: s.Parser<TSource, TObject>, source: TSource) {
    const state = s.State(source);
    try {
        return parser(state);
    } catch (error) {
        return {
            object: undefined,
            state,
        };
    }
}

describe('ObjectParser', () => {
    test('Read "foo" from "foo" and return "bar"', () => {
        const parser = s.ReturnParser(s.StringParser('foo'), 'bar');
        const source = 'foo';
        expect(parse(parser, source).object).toBe('bar');
        expect(parse(parser, source).state.position).toBe(3);
        expect(parse(parser, source).state.remainder).toBe('');
    });
});

describe('OptionalParser', () => {
    test('Read "foo" from "foo" optionally, and return "bar" if fails', () => {
        const parser = s.OptionalParser(s.StringParser('foo'), 'bar');
        const source = 'foo';
        expect(parse(parser, source).object).toBe('foo');
        expect(parse(parser, source).state.position).toBe(3);
        expect(parse(parser, source).state.remainder).toBe('');
    });
    
    test('Read "bar" from "foo" optionally, and return "bar" if fails', () => {
        const parser = s.OptionalParser(s.StringParser('bar'), 'bar');
        const source = 'foo';
        expect(parse(parser, source).object).toBe('bar');
        expect(parse(parser, source).state.position).toBe(0);
        expect(parse(parser, source).state.remainder).toBe('foo');
    });

    test('Read "Foo" from "foo" optionally, and return "bar" if fails', () => {
        const parser = s.OptionalParser(s.StringParser('Foo'), 'bar');
        const source = 'foo';
        expect(parse(parser, source).object).toBe('bar');
        expect(parse(parser, source).state.position).toBe(0);
        expect(parse(parser, source).state.remainder).toBe('foo');
    });
});

describe('PatternParser', () => {
    test('Read "foo" or "bar" from "foo-bar"', () => {
        const parser = s.PatternParser(/(foo|bar)/);
        const source = 'foo-bar';
        expect(parse(parser, source).object).toBe('foo');
        expect(parse(parser, source).state.position).toBe(3);
        expect(parse(parser, source).state.remainder).toBe('-bar');
    });

    test('Read "foo" or "bar" from "bar-foo"', () => {
        const parser = s.PatternParser(/(foo|bar)/);
        const source = 'bar-foo';
        expect(parse(parser, source).object).toBe('bar');
        expect(parse(parser, source).state.position).toBe(3);
        expect(parse(parser, source).state.remainder).toBe('-foo');
    });

    test('Read "foo" or "bar" from "it is foo and bar"', () => {
        const parser = s.PatternParser(/(foo|bar)/);
        const source = 'it is foo and bar';
        expect(parse(parser, source).object).toBeUndefined();
        expect(parse(parser, source).state.position).toBe(0);
        expect(parse(parser, source).state.remainder).toBe(source);
    });
});

describe('StringParser', () => {
    test('Read "foo" from "food"', () => {
        const parser = s.StringParser('foo');
        const source = 'food';
        expect(parse(parser, source).object).toBe('foo');
        expect(parse(parser, source).state.position).toBe(3);
        expect(parse(parser, source).state.remainder).toBe('d');
    });
    
    test('Read "bar" from "fool"', () => {
        const parser = s.StringParser('bar');
        const source = 'fool';
        expect(parse(parser, source).object).toBeUndefined();
        expect(parse(parser, source).state.position).toBe(0);
        expect(parse(parser, source).state.remainder).toBe(source);
    });

    test('Read "Foo" from "foo"', () => {
        const parser = s.StringParser('Foo');
        const source = 'foo';
        expect(parse(parser, source).object).toBeUndefined();
        expect(parse(parser, source).state.position).toBe(0);
        expect(parse(parser, source).state.remainder).toBe(source);
    });

    test('Read "Foo" from "foo" case-insensitively', () => {
        const parser = s.StringParser('Foo', true);
        const source = 'foo';
        expect(parse(parser, source).object).toBe('foo');
        expect(parse(parser, source).state.position).toBe(3);
        expect(parse(parser, source).state.remainder).toBe('');
    });
});
