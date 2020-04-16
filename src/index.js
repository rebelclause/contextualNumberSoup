import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Array and Object Destructuring in Context</h1>
<div>
   This console-driven example also demonstrates function curring. This involves passing a first-class function to a generator using either an array or an object. These nested arrow functions act as optional operators over values being generated, before the generator function yields them to the calling function.
</div>
`;
// // //
//
// Demonstrate a generator, destructuring in context and function currying.
// The code generates a new number and optionally operates on it, or its initial values, before yielding the value, every iteration,
// up to a maximum set by a passed parameter. Each number is split at the decimal. Head and tail are then logged to console.
//
// codepen.io Ctrl-Shift-7 rr-runs in console

// DEV.TO SOURCES
// Ken Bellows: https://dev.to/kenbellows/the-javascript-iteration-protocols-and-how-they-fit-in-1g8i
// Marc Backes: https://dev.to/_marcba/beginner-s-guide-to-es6-destructuring-ein
// Sarah Chima https://dev.to/sarah_chima/destructuring-assignment---arrays-16f
// OTHER:
// Aleen: https://aleen42.github.io/PersonalWiki/Programming/JavaScript/currying/currying.html

function handler(val) {
  // checks aren't strict, nor accurate
  // later, we identify whole numbers, if there is a decimal, or a zero before one, etc.
  let retVal = {};
  let str = val.toString();
  let dotIdx = str.indexOf(".");
  retVal["head"] = str.slice(0, dotIdx);
  retVal["tail"] = str.slice(dotIdx + 1, str.length);
  // console.log(`val: ${val} str: ${str} Head: ${retVal.head} Tail: ${retVal.tail}`)
  return retVal;
}

// hoisting lets the function be placed before the generator it calls
function calc(setup) {
  for (let val of genVal(setup)) {
    // stringify and strip val using a handler, also object destructuring, with clear names showing on both ends
    let { head, tail } = handler(val);
    console.log(`Head: ${head} Tail: ${tail}`);
  }
}

// generate a value from setup criteria, below, when called from calc(), above
function* genVal(setup) {
  // workaround declaration for later, conditional, destructuring within the if...else block
  let i, iters, valTop, valBottom, valFactor, funZ;
  // all passed will be objects so first distract for the object that is an array
  if (Array.isArray(setup)) {
    console.log("\n___________________________________________");
    // require semi-colon terminator to get past grammar parsing problem
    console.log("array path");
    // array destructuring proceeeds as normal w/o var,let.const
    [i, iters, valTop, valBottom, valFactor, funZ] = setup;
  } else {
    // is going to be an object, for sure
    console.log("\n___________________________________________");
    // require semi-colon terminator to overcome grammar parsing problem
    console.log("object path");
    // object destructuring w/o var,let, or const requires the object block to be 'hidden' within parentheses
    ({ i, iters, valTop, valBottom, valFactor, funZ } = setup);
  }
  // make the itertor iterable go
  // though, nothing here is done with much accuracy, it gets through...
  for (i; i <= iters; i++) {
    console.log("i: " + i);
    // console.log("valBottom: " + valBottom)
    // console.log("valFactor: " + valFactor)
    // newTail = valBottom * (valFactor * i)
    // console.log("newTail: " + newTail)
    // console.log("funZ: " + funZ(i)(valFactor));

    // CURRIED function (funZ) in use, Ahoy!
    if (i !== 1) {
      // console.log("valTop: " + valTop + i)
      yield (valTop + i) / (valBottom * funZ(i)(valFactor));
    } else {
      // console.log("valTop: " + valTop)
      yield valTop / valBottom;
    }
  }
}

// Two 'setup' types, one using arrSetup and the other using objSetup
// Only one operation via function currying implemented, different between array and object setups
// Could modularize the generator and let the setup do the talking in app.js

// features function currying to a depth of two, ie. m => n => m/n f(m(n))
// easily expanded to optionally support most operations between two vars
// see the generator function genVar() for a look at funZ in use

// i, iters, valTop, valBottom, valFactor, funZ
let arrSetup = [1, 2, 22, 7, 0.0101, m => n => m / n];

// these forms do not work:
// function(m,n){m*n}
// function(m,n){return m*n}
// function(m){function(n){m*n}}

let objSetup = {
  i: 1,
  iters: 2,
  valTop: 22,
  valBottom: 7,
  valFactor: 0.101,
  funZ: m => n => m ** n
};

// set in motion
calc(objSetup);
calc(arrSetup);
