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
  IconButton, // Import IconButton
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear"; // Import ClearIcon
import { thunks } from "../../../store/projects";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { isEmpty } from "lodash";
import Menu from "@mui/material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// import MenuItem from '@mui/material/MenuItem';
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

  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [dataCount, setDatacount] = useState(0);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [statusFilter, setStatusFilter] = useState(
    statusParams.get("status") || ""
  );

  const fetchIssueList = ({ search = false, status = "" }) => {
    const _search = search;
    const _status = status || statusFilter;
    dispatch(
      thunks["projects/getIssueList"]({
        ...(rowsPerPage && { limit: rowsPerPage }),
        page: page + 1,
        ...(!isEmpty(_search) && { search: _search }),
        projectId: currentProjectDetails._id,
        ...(!isEmpty(_status) && { status: _status }),
        isBacklogs: true,
      })
    ).catch((error) => {
      console.log("error");
    });
  };

  useEffect(() => {
    if (!isEmpty(currentProjectDetails)) {
      fetchIssueList({
        search: statusParams.get("search"),
        status: statusParams.get("status"),
      });
    }
  }, [currentProjectDetails]);

  useEffect(() => {
    fetchIssueList({ search: searchTerm });
  }, [page, rowsPerPage, statusFilter]);

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
    const params = { search: term, status: statusFilter };
    updateSearchParams(params);
    if (!/^\s*$/.test(term)) {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(function () {
        fetchIssueList({ search: term });
      }, 1500);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    const params = { search: "", status: statusFilter };
    updateSearchParams(params);
    fetchIssueList({ search: "" });
  };

  const handleStatusFilter = (e) => {
    const status = e.target.value;
    setStatusFilter(status);
    const params = { search: searchTerm, status: status };
    updateSearchParams(params);
  };

  const updateSearchParams = (params) => {
    const newSearchParams = new URLSearchParams(location.search);
    for (const key in params) {
      if (params[key]) {
        newSearchParams.set(key, params[key]);
      } else {
        newSearchParams.delete(key);
      }
    }
    nav(`${location.pathname}?${newSearchParams.toString()}`);
  };

  const handleRowClick = (id) => {
    nav(`/issue/${id}`); // Redirect to issue detail page with issue id
  };

  const truncateSummary = (summary) => {
    if(!summary){
      return ""
    }
    const maxLength = 50; // Adjust the maximum length as needed
    if (summary.length > maxLength) {
      return summary.substring(0, maxLength) + "...";
    }
    return summary;
  };

  useEffect(() => {
    setFilteredIssues(issueList.data);
    setDatacount(issueList.count);
  }, [issueList]);

  return (
    <Container maxWidth="false" sx={{ mt: 2 }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: 2, px: 1, }}
      >
        <TextField
          label="Search"
          variant="standard"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <SearchIcon />,
            endAdornment: searchTerm && (
              <IconButton onClick={handleClearSearch} size="small">
                <ClearIcon sx={{ fontSize: 16 }} />
              </IconButton>
            ),
          }}
          sx={{ width: "40%" }}
        />
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: "21px"}}>
        <Table /*sx={{  background: "rgba(81, 169, 227, 0.2)",}}*/>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  paddingRight: "20px",
                  textAlign: "center",
                }}
              >
                Issue Id
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  paddingRight: "20px",
                  textAlign: "center",
                }}
              >
                Summary
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  paddingRight: "20px",
                  textAlign: "center",
                }}
              >
                Due Date
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  paddingRight: "20px",
                  textAlign: "center",
                }}
              >
                Created Date
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  paddingRight: "20px",
                  textAlign: "center",
                }}
              >
                Updated Date
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  paddingRight: "20px",
                  textAlign: "center",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredIssues.map((issue) => (
              <TableRow
                key={issue.id}
                onClick={(e) => {
                  handleRowClick(issue.id);
                }}
                style={{ cursor: "pointer" }}
              >
                <TableCell sx={{ textAlign: "center" }}>
                  {issue.issueId}
                </TableCell>
                <TableCell>{truncateSummary(issue.summary)}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {moment(issue.dueDate).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {moment(issue.createdAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {moment(issue.updatedAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <MoreVertIcon
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setAnchorEl(e.currentTarget);
                    }}
                  />
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setAnchorEl(null);
                    }}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setAnchorEl(null);
                      }}
                    >
                      <IconButton aria-label="delete" sx={{ color: "#f44336" }}>
                        <DeleteIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    </MenuItem>
                    <MenuItem>
                      <IconButton
                        aria-label="Edit"
                        size="xsmall"
                        sx={{ color: "#974998" }}
                      >
                        <EditIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    </MenuItem>
                  </Menu>
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
          sx={{/* background: "rgba(81, 169, 227, 0.2)",*/}}
        />
      </TableContainer>
    </Container>
  );
};

export default IssueListPage;
