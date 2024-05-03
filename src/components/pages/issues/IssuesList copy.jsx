import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Pagination } from "@mui/material";
import { thunks } from "../../../store/projects";
import debounce from "lodash.debounce";
import { isEmpty } from "lodash";
import moment from "moment";

let typingTimer;

const IssueListPage = () => {
  const nav = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const issueList = useSelector((state) => state.projects.issueList);
  const currentProjectDetails = useSelector(
    (state) => state.projects.projectDetails.selected
  );
  let [searchParams, setSearchParams] = useSearchParams();
  let [statusParams, setStatusParams] = useSearchParams();
  let [queryParamsDetails, setQueryParamsDetails] = useState({});

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [dataCount, setDatacount] = useState(0);
  const [searchTerm, setSearchTerm] = useState(statusParams.get("search"));
  const [statusFilter, setStatusFilter] = useState(statusParams.get("status"));

  const fetchIssueList = ({ search = false, status = "" }) => {
    const _search = search || statusParams.get("search") || searchTerm;
    const _status = status 
    dispatch(
      thunks["projects/getIssueList"]({
        ...(rowsPerPage && { limit: rowsPerPage }),
        page: page + 1,
        ...(!isEmpty(_search) && { search: _search }),
        projectId: currentProjectDetails._id,
        ...(!isEmpty(_status) && { status: _status }),
      })
    ).catch((error) => {
      console.log("error");
    });
  };

  useEffect(() => {
    if (!isEmpty(currentProjectDetails)) {
      fetchIssueList({status: statusParams.get("status")});
    }
  }, [currentProjectDetails]);

  useEffect(() => {
    fetchIssueList({})
  },[page,rowsPerPage])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
   
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setQueryParams({ key: "search", value: term });
    if (!/^\s*$/.test(term)) {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(function () {
        fetchIssueList({ search: term });
      }, 1500);
    }
  };

  const setQueryParams = ({ key, value }) => {
    if (isEmpty(value)) {
      if (key == "status") {
        setStatusParams({});
      } else {
        setStatusParams({});
      }
    } else {
      if (key == "status") {
        const status = statusParams.entries()

        debugger;
        setStatusParams({ [key]: value,...status });
      } else {
        const status = statusParams.entries()
        console.log('statusParams.getAll()',statusParams.entries());
        setStatusParams({ [key]: value,...status });
      }
    }
  };

  const handleStatusFilter = (e) => {
    const status = e.target.value;
    setQueryParams({ key: "status", value: status });
    setStatusFilter(status);
    fetchIssueList({ status });
  };

  const handleRowClick = (id) => {
    nav(`/issue/${id}`); // Redirect to issue detail page with issue id
  };

  const truncateSummary = (summary) => {
    const maxLength = 50; // Adjust the maximum length as needed
    if (summary.length > maxLength) {
      return summary.substring(0, maxLength) + "...";
    }
    return summary;
  };

  useEffect(() => {
    setFilteredIssues(issueList.data);
    setDatacount(issueList.count)
  }, [issueList]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", mt: 5 }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: 2, px: 1 }}
      >
        <TextField
          label="Search"
          variant="standard"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{ startAdornment: <SearchIcon /> }}
          sx={{ width: "40%" }}
        />
        <FormControl variant="standard" sx={{ width: "20%" }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={handleStatusFilter}
            label="Status"
            startIcon={<FilterAltIcon />}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="InProgress">In Progress</MenuItem>
            <MenuItem value="InReview">InReview</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", paddingRight: "20px" }}>
                Issue Id
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", paddingRight: "20px"}}>
                Summary
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", paddingRight: "20px",width: 100 }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", paddingRight: "20px" }}>
                Due Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", paddingRight: "20px" }}>
                Created Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", paddingRight: "20px" }}>
                Updated Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", paddingRight: "20px" }}>
               Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredIssues.map((issue) => (
              <TableRow
                key={issue.id}
                onClick={() => handleRowClick(issue.id)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{issue.issueId}</TableCell>
                <TableCell>{truncateSummary(issue.summary)}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      background: "#0000ff66",
                      borderRadius: "20px",
                      padding: 1,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {issue.status}
                  </Box>
                </TableCell>
                <TableCell>
                  {moment(issue.dueDate).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell>
                  {moment(issue.createdAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell>
                  {moment(issue.updatedAt).format("DD-MM-YYYY")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default IssueListPage;
