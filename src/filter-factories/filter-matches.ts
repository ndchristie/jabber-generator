export default (...tests: any[]): Function => (
  candidate: string,
  { prefix = '' }: { prefix?: string } = {},
): boolean => {
  const potentialResult = prefix + candidate;
  return !tests.some(t => potentialResult.match(t) !== null); // reject any match
};
