
var should = require('should');
var docdiff = require('../');

describe('docdiff', function () {

  it('should detect no change', function () {
    docdiff({ a: 1 }, { a: 1 }).should.eql([]);
  });

  it('should detect simple value change', function () {
    docdiff({ a: 1 }, { a: 2 }).should.eql([
      {
        path: ['a'],
        change: 'update',
        type: 'primitive',
        values: {
          now: 2,
          original: 1
        }
      }
    ]);
  });

  it('should detect simple value added', function () {
    docdiff({ a: 1 }, { a: 1, b: 2 }).should.eql([
      {
        path: ['b'],
        change: 'add',
        type: 'primitive',
        values: {
          now: 2
        }
      }
    ]);
  });

  it('should detect simple value removed', function () {
    docdiff({ a: 1 }, {}).should.eql([
      {
        path: ['a'],
        change: 'remove',
        type: 'primitive',
        values: {
          original: 1
        }
      }
    ]);
  });

  it('should diff primitive array', function () {
    docdiff({ a: [1, 2] }, { a: [1, 3] }).should.eql([
      {
        path: ['a'],
        change: 'update',
        type: 'primitiveArray',
        values: {
          now: [1, 3],
          original: [1, 2],
          added: [3],
          removed: [2]
        }
      }
    ]);
  });

  it('should diff document array', function () {
    docdiff({ a: [{ b: 2 }] }, { a: [{ b: 3 }] }).should.eql([
      {
        path: ['a'],
        change: 'update',
        type: 'documentArray',
        values: {
          now: [{ b: 3 }],
          original: [{ b: 2 }]
        }
      }
    ]);
  });

  it('should diff mixed array', function () {
    docdiff({ a: [{ b: 2 }, 1] }, { a: [{ b: 3 }, 2] }).should.eql([
      {
        path: ['a'],
        change: 'update',
        type: 'mixedArray',
        values: {
          now: [{ b: 3 }, 2],
          original: [{ b: 2 }, 1]
        }
      }
    ]);
  });

  it('should correctly diff primitive in nested object', function () {
    docdiff({ a: { b: 1 } }, { a: { b: 2 } }).should.eql([
      {
        path: ['a', 'b'],
        change: 'update',
        type: 'primitive',
        values: {
          now: 2,
          original: 1
        }
      }
    ]);
  });

  it('should correctly diff primitive array in nested object', function () {
    docdiff({ a: { b: [10, 12] } }, { a: { b: [11] } }).should.eql([
      {
        path: ['a', 'b'],
        change: 'update',
        type: 'primitiveArray',
        values: {
          now: [11],
          original: [10, 12],
          added: [11],
          removed: [10, 12]
        }
      }
    ]);
  });

});
