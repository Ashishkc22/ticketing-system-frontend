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
  IconButton,
  Button,
  Modal,
  Grid,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear";
import { thunks,actions } from "../../../store/projects";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { isEmpty } from "lodash";
import Menu from "@mui/material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BOARD_CONSTANTS from "../../../constants/board";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";
import CreateIssue from "./addEditIssue";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import "./Issue.css"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

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

  const statusColorMapper = {
    InReview: "#f7c984",
    InProgress: "#42a5f5",
    Done: "#91b992",
    Pending: "#82bded",
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [dataCount, setDatacount] = useState(0);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNewIssueModalOpen, setNewIssueModalState] = useState(false);
  const [editIssueData, setEditIssueData] = useState({});
  const [statusFilter, setStatusFilter] = useState(
    statusParams.get("status") || ""
  );
  const [issueToBeDeleted, setIssueToBeDeleted] = useState("");

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
    return () => {
      console.log('issue list unmounting');
      dispatch(actions.resetIssueList());
    }
  },[])

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

  const removeIssue = () => {
    dispatch(
      thunks["project/deleteIssueById"]({
        id: issueToBeDeleted,
      })
    );
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
    nav(`issue-details?id=${id}`); // Redirect to issue detail page with issue id
  };

  const truncateSummary = (summary) => {
    if (!summary) {
      return "";
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
      {/* <Box sx={{ display: "flex", flexDirection: "column", mt: 5 }}> */}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: 2, px: 1 }}
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
      <div
        style={{
          marginBottom: "10px",
          marginTop: "10px",
          "flex-direction": "row-reverse",
          display: "flex",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setNewIssueModalState(true)}
        >
          Create Issue
        </Button>
        <Modal
          open={isNewIssueModalOpen}
          onClose={() => {
            setEditIssueData({});
            setNewIssueModalState(false);
          }}
        >
          <CreateIssue
            closeModal={() => {
              fetchIssueList({
                search: statusParams.get("search"),
                status: statusParams.get("status"),
              });
              setNewIssueModalState(false);
            }}
            issueData={editIssueData}
          />
        </Modal>
      </div>
      <TableContainer component={Paper} sx={{ borderRadius: "21px"}}>
        <Table /* sx={{ background: "rgba(81, 169, 227, 0.2)" }}*/>
          <TableHead>
            <TableRow sx={{ px: 10 }}>
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
                  width: 100,
                  textAlign: "center",
                }}
              >
                Status
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
                  handleRowClick(issue._id);
                }}
                style={{ cursor: "pointer" }}
              >
                <TableCell sx={{ textAlign: "center" }}>
                  {issue.issueId}
                </TableCell>
                <TableCell>{truncateSummary(issue.summary)}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      background: statusColorMapper[issue.status],
                      borderRadius: "20px",
                      padding: 1,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {BOARD_CONSTANTS.issueStatusMapper[issue.status] ||
                      issue.status}
                  </Box>
                </TableCell>
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
                  <IconButton
                    aria-label="Edit"
                    size="xsmall"
                    sx={{ color: "#974998" }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setEditIssueData(issue);
                      setNewIssueModalState(true);
                    }}
                    className="edit-button-animation"
                  >
                      <img
                style={{ width:"15px" }}
                src="/action-icons/pencil.png"
                alt="edit"
              />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    sx={{ color: "#f44336" }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="edit-button-animation"
                  >
                    <img
                style={{ width:"15px" }}
                src="/action-icons/delete.png"
                alt="delete"
                onClick={() => {
                  setIsDialogOpen(true);
                  setIssueToBeDeleted(issue._id);
                }}
              />
                    {/* <DeleteIcon
                      sx={{ fontSize: 20 }}
                      onClick={() => {
                        setIsDialogOpen(true);
                        setIssueToBeDeleted(issue._id);
                      }}
                    /> */}
                  </IconButton>

                  {/* <MoreVertIcon
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
                  </Menu> */}
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
          // sx={{ background: "rgba(81, 169, 227, 0.2)" }}
        />
      </TableContainer>
      <Dialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}
        sx={{
          "& .MuiDialog-paper": {
            width: "30%", // Custom width
            maxWidth: "none", // Remove the default maxWidth restriction
            background: "floralwhite",
            borderRadius: "21px",
          },
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            sx={{ mt: 2 }}
          >
            <ErrorOutlineIcon sx={{ fontSize: "67px", color: "red" }} />
          </Grid>
          <Grid item xs={12} padding={0}>
            <DialogTitle>Delete Confirmation</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this issue?
              </DialogContentText>
            </DialogContent>
          </Grid>
          <Grid item xs={12} padding={0} display="flex" justifyContent="right">
            <DialogActions>
              <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={() => {
                  removeIssue();
                  setIsDialogOpen(false);
                  fetchIssueList({
                    search: statusParams.get("search"),
                    status: statusParams.get("status"),
                  });
                }}
                sx={{ color: "red" }}
              >
                Delete
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </Dialog>
      {/* </Box> */}
    </Container>
  );
};

export default IssueListPage;
