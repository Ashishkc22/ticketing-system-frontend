export default {
  issueTypes: [
    { name: "Todo", value: "Pending" },
    { name: "In progress", value: "InProgress" },
    { name: "In review", value: "InReview" },
    { name: "Done", value: "Done" },
  ],
  issueStatusMapper: {
    Pending: "Pending",
    InProgress: "In Progress",
    InReview: 'In Review',
    Done:"Done"
  }
};
