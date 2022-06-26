const filterApprovalEvents = (items) => {
  return items.filter((item) => {
    let isApproval = false;
    item.log_events.forEach((log) => {
      if (log.decoded && log.decoded.name === "Approval") isApproval = true;
    });
    return isApproval;
  });
};

export default filterApprovalEvents;
