export default (
  candidate: string,
  { prefix }: { prefix: string },
) => {
  return (
    prefix.match(/[^aeiou]$/i) === null // if prefix ends in a consonant...
    || candidate.match(/^[^aeiou]/i) === null // candidate can't begin with a consonant
  );
};
