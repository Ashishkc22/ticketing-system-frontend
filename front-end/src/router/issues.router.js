import IssueList from "../components/pages/issues/IssuesList";
import IssueDetails from "../components/pages/issues/issueDetails";

export default [
  {
    path: "issues",
    element: <IssueList />,
  },
  {
    path: "issues/issue-details",
    label: "issueDetails",
    element: <IssueDetails />,
  },
];
