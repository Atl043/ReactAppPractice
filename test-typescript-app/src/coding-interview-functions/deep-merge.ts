/*
Write a function called deepMerge that is similar to Object.assign, 
taking a target object and any number of source objects as input. 
Unlike Object.assign, it should merge objects deeply. 
Values are limited to objects, strings and integers (no arrays or functions);
 
Test cases:
deepMerge({ a: 1 }, { a: 2 }, { a: 3}, {e: 4})
// { a: 3, e: 4 }
 
deepMerge({ a: 1 }, { a: { b: 2 } }, {e: 4})
// { a: { b: 2 }, e:4 }
 
deepMerge(
 { a: { b: { c: 1 } } },
 { a: { b: { d: 2 } }, e: 3 },
 { e: 4 }
)
// { a: { b: { c: 1, d: 2 } }, e: 4 }
*/
// Curry function implementation
export default function deepMerge(...objects: any) {
  return objects.reduce((prev: any, obj: any) => {
    Object.keys(obj).forEach((key) => {
      // console.log("key", key);
      // right now at the 'a' or 'b' level
      const pVal = prev[key];
      const cVal = obj[key];

      // both are arrays like 'd' in obj1 and obj 2
      if (Array.isArray(pVal) && Array.isArray(cVal)) {
        prev[key] = pVal.concat(...cVal);
      }
      // both are objects so rerun this method on a lower level
      else if (isObject(pVal) && isObject(cVal)) {
        prev[key] = deepMerge(pVal, cVal);
      }
      // set to new key
      else {
        prev[key] = cVal;
      }
    });
    return prev;
  }, {});
}

function isObject(obj: any) {
  return obj && typeof obj === "object";
}

// Test objects
const obj1 = {
  a: 1,
  b: 1,
  c: { x: 1, y: 1 },
  d: [1, 1],
};
const obj2 = {
  b: 2,
  c: { y: 2, z: 2 },
  d: [2, 2],
  e: 2,
};

export const test1 = deepMerge(obj1, obj2);
export const test2 = deepMerge({ a: 1 }, { a: 2 }, { a: 3 }, { e: 4 });
// { a: 3, e: 4 }
export const test3 = deepMerge({ a: 1 }, { a: { b: 2 } }, { e: 4 });
// { a: { b: 2 }, e:4 }

export const test4 = deepMerge(
  { a: { b: { c: 1 } } },
  { a: { b: { d: 2 } }, e: 3 },
  { e: 4 }
);
//    { a: { b: { c: 1, d: 2 } }, e: 4 }
