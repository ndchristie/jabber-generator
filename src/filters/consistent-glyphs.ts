export default (...groups: any[]) => (
  candidate: string,
  { prefix = '' }: { prefix?: string } = {},
) => {
  const potentialResult = prefix + candidate;
  return !groups.some( // return false if any group of tests
    tests => tests.reduce(
      (acc, test) => potentialResult.match(test) === null ? acc : acc + 1,
      0,
    ) > 1, // matches on more than a single test
  );
};
