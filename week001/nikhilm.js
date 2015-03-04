var assert = require('assert');

function add() {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }

  var retfn = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(sum);
    return add.apply(undefined, args);
  }

  // JS will first call valueOf() when trying to cast to a primitive. Instead
  // we return a function here. So when JS tries to use it as a function, it
  // works, when it tries to use as a primitive it fails, leading to toString()
  // being used instead. toString() simply returns the sum of this calls
  // arguments.
  retfn.valueOf = function() {
    return retfn;
  };
  retfn.toString = function() { return sum; }
  return retfn;
}

exports.add = add;
assert.ok(add(2, 5) == 7);
assert.ok(add(2)(5) == 7);
assert.ok(add(2)(5)(1, 3)(4) == 15);
assert.ok(add(2)(5)(1, 3)(4)(1, 1, 2)(1)()(1, 1) == 22);
