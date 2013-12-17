
# docdiff

Simple tool for diff'ing two documents (objects)

## Example

```js
var docdiff = require('docdiff');

var original = {
  a: 1
};

var now = {
  a: 2
};

var diff = docdiff(original, now);

// diff:
//
// [
//   {
//     path: ['a'],
//     change: 'update',
//     type: 'primitive',
//     values: {
//       now: 2,
//       original: 1
//     }
//   }
// ]
```

See tests for more examples

## Spec

docdiff will return an array of changes, each change will comprise of the following:

 - **path** *[array]* An array of object keys that lead to the value described in this change, for example the changed value at `{ a: { b: 2 } }` would have the path `[a, b]`
 - **change** *[string]* One of: `add`, `update` or `remove`
 - **type** *[string]* One of `primitive`, `primitiveArray` (array of primitives), `documentArray` (array of objects) or `mixedArray`
 - **values** *[object]*:
  - **now** *[mixed]* The new value (undefined for type `remove`)
  - **original** *[mixed]* The original value (undefined for type `add`)
  - **added** *[array]* Array of elements added (undefined for anything other than `primitiveArray`)
  - **removed** *[array]* Array of elements removed (undefined for anything other than `primitiveArray`)

## Notes on Arrays

Diffing arrays is hard because there is no universal way of identifing which value in the new array corresponds to which value in the original array (positions may have changed).
Subsequently, docdiff is currently naive to changes in arrays that contain anything other than primitives. If the changed array contains ONLY primitives, the type will be `primitiveArray` and the values object will contain both `added` and `removed` for further inspection.
However, if an array contains only objects, docdiff will simply return the current and original arrays. You may add you're own post processing of this, for example if you're documents inside the array had id's, you will be able to identify changes properly (pass before and after back to docdiff).
the `mixedArray` type will be used when the array contains neither objects or primitves exclusively.

## Author

[Thom Seddon](http://twitter.com/ThomSeddon)

## License

Copyright (c) 2013-present Thom Seddon

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.