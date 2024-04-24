const formatCurrency = (cents: number) => {
  return (Math.round(cents) / 100).toFixed(2);
};

export { formatCurrency };
