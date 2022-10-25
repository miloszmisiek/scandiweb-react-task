export const roundNumber = (num) => {
  return (Math.ceil(num * 100) / 100).toFixed(2);
};
