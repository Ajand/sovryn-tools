export const hasAllowances = (tac, contractAddress) => {
  return tac && tac.get(contractAddress);
};

export const tacArray = (tac, contractAddress) => {
  return [...tac.get(contractAddress)];
};
