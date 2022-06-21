const formatAddress = (addr) => {
  if (!addr) return "";
  return `${addr.substring(0, 6)}...${addr.substring(
    addr.length - 6,
    addr.length
  )}`;
};

export default formatAddress;
