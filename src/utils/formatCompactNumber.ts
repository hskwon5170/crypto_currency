export const formatCompactNumber = (val: number) => {
  if (val < 1000) {
    return val;
  }

  if (val >= 1000 && val < 1_000_000) {
    return (val / 1000).toFixed(1) + "K";
  }

  if (val >= 1_000_000 && val < 1_000_000_000) {
    return (val / 1_000_000).toFixed(1) + "M";
  }

  if (val >= 1_000_000_000 && val < 1_000_000_000_000) {
    return (val / 1_000_000_000).toFixed(1) + "B";
  }

  if (val >= 1_000_000_000_000 && val < 1_000_000_000_000_000) {
    return (val / 1_000_000_000_000).toFixed(1) + "T";
  }
};
