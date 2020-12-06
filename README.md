# Sincode

Sincode is a simple parser combinator module.
This can of course be used for a string, but also can be used for a list of object.

Sincode supports:
- IE 10+
- Edge
- Firefox
- Chrome
- Safari
- Opera
- Node.js
- etc...

Created in TS, and contains declarations in the module.



## Installation


### Node

```
npm install rtanpo440/sincode
```



## Usage


### Steps

1. Import 'sincode'.
1. Define parsers.
1. Create a State object.
1. Call the parser to parse.
1. Get the result.


## Examples


### Basics

```ts
import sincode from 'sincode';

// define comma-separated identifiers.
// SeparatedParser returns a list of items
const parser = sincode.SeparatedParser(
    sincode.RegExpParser(/[a-z_][a-z0-9_]*/i),
    sincode.TrimmedParser(sincode.StringParser(',')),
);

// prepare a source
const state = sincode.State('abc, def, ghi');

try {
    // parse
    const result = parser(state);

    // print the result
    // - result.state : the remaining
    // - result.object : the object read
    console.dir(result, {
        depth: null,
    });
} catch (error) {
    // ...
}
```


### Sequence

```ts
import sincode from 'sincode';

// define assign statement
const parser = sincode.Parser((state: sincode.State<string>) => {
    // These raise an error if parsing fails.

    // left identifier
    const left = sincode.TrimmedParser(
        sincode.RegExpParser(/[a-z_][a-z0-9_]*/i)
    )(state);

    // assignment operator
    const equal = sincode.TrimmedParser(
        sincode.StringParser('=')
    )(left.state);

    // right integer
    const right = sincode.TrimmedParser(
        sincode.RegExpParser(/[1-9][0-9]*/)
    )(equal.state);

    return {
        // the remainder
        state: right.state,

        // the object read
        object: {
            left: left.object,
            right: right.object,
        },
    };
});

// prepare a source
const state = sincode.State('score = 30');

try {
    // parse
    const result = parser(state);

    // print the result
    console.log(`assigning ${result.object.right} to ${result.object.left}`);
} catch (error) {
    // ...
}
```



## Parsers

### Generic

- `CenterParser` - CenterParser(a, b, c) reads a, b, and c, and then returns b.
- `CharacterParser` - Reads a character.
- `ChoiceParser` - Returns the result of a parser succeeded first.
- `CustomErrorParser` - Customizes the error message.
- `FatalizeParser` - Changes the error class from NormalParserError to FatalParserError.
- `InstanceParser` - Reads an instance.
- `MapParser` - Converts the object read.
- `OptionalParser` - Returns a specified default object instead of raising an error if the inner parser fails.
- `Parser` - Creates a custom sequence parser.
- `RegExpParser` - Reads a string matching a specified pattern.
- `RepeatParser` - Reads something multiple times.
- `ReturnParser` - Returns a constant object.
- `SeparatedParser` - Reads the separated items.
- `StringParser` - Reads a constant string.
- `TrimmedParser` - Trims heading or trailing spaces.

### General

- `DigitParser` - `[0-9]`
- `DigitsParser` - `[0-9]+`
- `LetterParser` - `(?i)[a-z]`
- `LettersParser` - `(?i)[a-z]+`


## License

Licensed under the MIT License.
