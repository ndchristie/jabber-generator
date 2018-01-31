export default (...tests: any[]): Function => (
  candidate: string,
  { prefix = '' }: { prefix?: string } = {},
): boolean => {
  const potentialResult = prefix + candidate;
  return tests.reduce(
    (acc, test) => potentialResult.match(test) === null ? acc : acc + 1,
    0,
  ) <= 1; // matches on more than a single test
};
