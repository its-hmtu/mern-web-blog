export const getPaginationItems = (current, total) => {
  const delta = 2;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i);
  }

  if (current - delta > 2) {
    rangeWithDots.push('...');
  }

  for (let i of range) {
    rangeWithDots.push(i);
  }

  if (current + delta < total - 1) {
    rangeWithDots.push('...');
  }

  rangeWithDots.unshift(1);
  if (total > 1) {
    rangeWithDots.push(total);
  }

  return rangeWithDots;
};
