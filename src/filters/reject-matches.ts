export default (...tests: any[]) => (
  candidate: string,
  { prefix = '' }: { prefix?: string } = {},
) => {
  const potentialResult = prefix + candidate;
  return !tests.some(t => potentialResult.match(t) !== null); // reject any match
};
