const regEmoji = new RegExp(
  /[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/,
  'g'
);
export const removeEmoji = (input) => input.replace(regEmoji, '');

export const createData = (
  name,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  eleven,
  twelve
) => {
  return {
    name,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    eleven,
    twelve,
  };
};
export const NumberOfRounds = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
];
export const RoundData = {
  round1: 10,
  round2: 10,
  round3: 10,
  round4: 10,
  round5: 10,
  round6: 10,
  round7: 10,
  round8: 10,
  round9: 10,
  round10: 10,
  round11: 10,
  round12: 10,
};
