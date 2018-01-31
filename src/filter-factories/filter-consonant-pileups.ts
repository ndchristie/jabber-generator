export default (prefixMaxConsonants: number, candidateMaxConsonants: number = 1): Function => (
  candidate: string,
  { prefix = '' }: { prefix?: string } = {},
): boolean => {
  const prefixTerminalConsonantCount = prefix.match(/[^aeiou]*$/i)[0].length;
  const candidateInitialConsonantCount = candidate.match(/^[^aeiou]*/i)[0].length;
  return (
    prefixTerminalConsonantCount < prefixMaxConsonants
    || candidateInitialConsonantCount < candidateMaxConsonants
  );
};
