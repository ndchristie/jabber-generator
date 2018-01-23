export default (...pairs: [any, any][]) => (untransformed: string) => {
  for (let i = 0; i < pairs.length; i += 1) {
    const match = untransformed.match(pairs[i][0]);
    if (match !== null && match.length > 0) {
      return untransformed.replace(pairs[i][0], pairs[i][1]);
    }
  }
  return untransformed;
};
