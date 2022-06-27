const findApprovalAddresses = (userAddress) => (items) => {
  let approvalAddresses = new Map();
  items.forEach((item) => {
    item.log_events.forEach((log) => {
      if (
        log.decoded &&
        log.decoded.name === "Approval" &&
        log.decoded.params[0].value.toLowerCase() === userAddress.toLowerCase()
      ) {
        const approvalSet = approvalAddresses.get(log.sender_address)
          ? new Set([...approvalAddresses.get(log.sender_address)])
          : new Set();
        approvalSet.add(log.decoded.params[1].value);
        approvalAddresses.set(log.sender_address, approvalSet);
      }
    });
  });
  return approvalAddresses;
};

export default findApprovalAddresses;
