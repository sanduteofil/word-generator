/* Given a list of words and a string made up of those words (no spaces), return the original sentence in a list.
If there is more than one possible reconstruction, return any of them.
If there is no possible reconstruction, then return an empty array.

For example:
Given the set of words 'quick', 'brown', 'the', 'fox', and the string "thequickbrownfox", you should return ['the', 'quick', 'brown', 'fox'].
Given the set of words 'bed', 'bath', 'bedbath', 'and', 'beyond', and the string "bedbathandbeyond", return either ['bed', 'bath', 'and', 'beyond] or ['bedbath', 'and', 'beyond'].
*/

const extraCheck = (existentArray, existentWord) => {
  let alreadyExists = false;

  existentArray.forEach((word) => {
    if (existentWord.includes(word)) {
      alreadyExists = true;
    }
  });

  return alreadyExists;
};

export const separateList = (incomingArray, incomingString) => {
  let computedArray = [];

  incomingArray.forEach((word) => {
    if (incomingString.includes(word) && !extraCheck(computedArray, word)) {
      computedArray.push(word);
    }
  });

  return computedArray;
};

/* Some text cases used
const array = ['quick', 'brown', 'the', 'fox'];
const sentence = 'thequickbrownfox';

const array = ['bed', 'bath', 'bedbath', 'and', 'beyond'];
const sentence = 'bedbathandbeyond';

console.log(separateList(array, sentence));
*/
