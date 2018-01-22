export default (x: number = 2) => (
  candidate: string,
  { prefix }: { prefix: string },
) => {
  const prefixTerminalConsonantCount = prefix.match(/[^aeiou]*$/i)[0].length;
  const candidateBeginsWithVowel = candidate.match(/^[aeiou]/i) !== null;
  return prefixTerminalConsonantCount < x || candidateBeginsWithVowel;
};
