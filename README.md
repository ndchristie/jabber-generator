# Jabber Generator

> A flexible, extensible fantasy word generator written in TypeScript

## Installation & Use

To install the generator itself, simply run

```bash
$ npm install --save jabber-generator
```

This will install the Jabber Generator itself.

### Basic Use

Require 'jabber-generator' and create an instance to start generating.
```javascript
const JabberGenerator = require('jabber-generator');
const myGenerator = new JabberGenerator();
```

#### Words & Elements

Elements is an array of strings which Jabber will use to create words.  You will notice that without any elements, Jabber will produce a warning on instantiation.  Let's give our generator some building-blocks:

```javascript
// instantiates a generator with word elements
const myGenerator = new JabberGenerator({ elements: ['foo', 'bar'] });
```
This will take care of the warning.  It also means our generator will build words from combinations of 'foo' and 'bar':

```javascript
// returns one of 'foofoo', 'foobar', 'barfoo', or 'barbar'
myGenerator.getWord();
```

You can also add word elements after instantiation:

```javascript
myGenerator.addElement('buzz');
myGenerator.addElements(['bing', 'bang']);

// returns combinations like 'bingbang', 'foobuzz', 'buzzbar', etc
myGenerator.getWord();
```

By default, the generator will return a joined pair of word elements.  You can also specify a number of elements to join:

```javascript
// returns individual word elements
myGenerator.getWord(1);
// similar to above
myGenerator.getElement();
// returns triplets like 'foofoobar', 'foobarfoo', etc
myGenerator.getWord(3);
```

### Filters & Transforms

Generators can be extended with filters and transforms to help ensure better results.

#### Filters

Filters are functions that return a boolean for each element generated, accepting or rejecting certain combinations.  Each element must pass every filter for a word to be generated.  Filters are provided with the next potential word element ('candidate'), the word generated so far ('prefix'), and whether the candidate is the first and/or last element to be generated.

Filters can be passed as an array to a new generator:

```
const myGenerator = new JabberGenerator({
    elements: ['foo', 'bar', 'buzz'],
    filters: [
        (candidate, { prefix }) => prefix[0] !== candidate[0], 
    ],
});
```

The example above will reject any candidates beginning with the same character as the first element.  So if the first roll is 'foo', the only results can be 'foobar' or 'foobuzz'.  If the first roll is 'bar', the word must be 'barfoo'.  Let's add some more filters:

```javascript
myGenerator.addElement('fuzz');
myGenerator.addFilters([
    (candidate, { isInitial }) => isInitial !== candidate.length < 4,
    (candidate, { isTerminal }) => isTerminal || candidate[0] === 'f',
]);
```

The first new filter states that the first element must be at least 4 characters, and subsequent elements must be less than 4 characters.  The second filter states that all but the final element must start with 'f'.

Together these imply that ```myGenerator.getWord()``` can only return 'fuzzbar', since this is the only combination that passes every filter.  Of course in most contexts, we expect filters to be looser, and word elements to be a much larger set.

##### Problematic Filters

It's possible to accidentally write filters that eliminate all combinations.  This will produce an error if the generator is run:

```
myGenerator.addFilter(() => false); // rejects all candidates
myGenerator.getWord(); // will error
```

The above is an obvious example; it's more more likely in practice that two filters that are fine apart would cause an issue under certain conditions:

```javascript
const myGenerator = new JabberGenerator({
    elements: ['on', 'off', 'null'],
    filters: [
        // first element must start with a vowel
        (candidate, { isInitial }) => !(isInitial && candidate.match(/^[aeiou]/) === null),
        // final element must not start with a vowel
        (candidate, { isTerminal }) => !(isTerminal && candidate.match(/^[^aeiou]/) === null),
    ],
});
```
In the above example, ```myGenerator.getWord()``` can return 'onnull' or 'offnull'.  However, attempting to run ```myGenerator.getWord(1)``` will error, because the first element is also the final element, and cannot pass both tests.


#### Transforms

Transforms are functions applied to the already-generated word.  They should return a string.  They can be added just like filters:

```javascript
const myGenerator = new JabberGenerator({
    elements: ['foo', 'bar', 'raf'],
    transforms: [
        untransformed => untransformed.replace(/(\w)\1/g, '$1'),
    ],
});
```

The above will replace any doubled characters, so 'barraf' would become 'baraf', 'raffoo' would become 'rafo', and so on.

##### Ordering Transforms

Transforms progressively mutate the resulting word, so order matters for transforms that make conflicting changes.  For example:

```javascript
const transformK2C = untransformed => untransformed.replace(/k/gi, 'c');
const transformKW2QU = untransformed => untransformed.replace(/kw/gi, 'qu');
```

Running the above transforms in that order would prevent the second from ever making changes, since all instances of 'kw' would have already become 'cw'.  Running them in the opposite order would be preferable.

#### Which one to use?

**Filters** are great for preventing *unsalvageable* results.  For instance, Latin words cannot end in a 'g' sound.  If the intention is to generate Latin-like words, a filter should be used to prevent this.

Because filters are aggressive and expensive, they should not eliminate words that can be rescued by transforms.

**Transforms** are great for improving *readability or style*.  For instance, an English-speaker can pronounce the word 'pplojj', but this would be far better written as 'plodge'.  Transforms are ideally suited to this.

Because transforms progressively mutate the resulting word, they should avoid making dramatic changes, and rely instead on filters to prevent difficult results from being produced.

### Using Modules

Modules can be defined for reusable rulesets.  They look exactly like the options passed to the constructor:

```javascript
const myModule = {
    elements: ['foo', 'bar'],
    filters: [
        (candidate, { prefix }) => prefix[0] !== candidate[0]
    ],
    transforms: [
        untransformed => untransformed.replace(/(\w)\1/g, '$1')
    ],
};

const myGenerator = new JabberGenerator(myModule); // perfectly valid
```

Modules can also be nested:

```javascript
const elementModule = {
    elements: ['foo', 'bar'],
};

const filterModule = {
    modules: [elementModule],
    filters: [
        (candidate, { prefix }) => prefix[0] !== candidate[0]
    ],
};

const myGenerator = new JabberGenerator({
    modules: [filterModule],
    elements: ['bing', 'bang'],
    transforms: [
        untransformed => untransformed.replace(/(\w)\1/g, '$1')
    ],
})
```

The resulting generator has the elements and filters from the other modules, as well as the elements and transforms passed to the contructor.

Just like elements, filters, and transforms, modules can be added after instantiation:

```javascript
const myGenerator = new JabberGenerator();
myGenerator.addModules([moduleA, moduleB]);
myGenerator.addModule(moduleC);
```

...giving the developer fine-tuned control over which modules to use where, and in which order.

For an example module, check out [Jabber Standard English](https://github.com/ndchristie/jabber-standard-english) on GitHub, also available as an [NPM Package](https://www.npmjs.com/package/jabber-standard-english).
