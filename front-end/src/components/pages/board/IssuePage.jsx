import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import IssueStack from "./IssueStack";
import boardConstants from "../../../constants/board";
import {
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  InputAdornment,
  IconButton,
  Container,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import { thunks, actions } from "../../../store/projects";
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep, flattenDepth, isEmpty } from "lodash";
import { useNavigate, useSearchParams } from "react-router-dom";

let typingTimer;

function IssuePage() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  // *********************************************************Global State*********************************************************//
  const _issueList = useSelector((state) => state.projects.boardData);
  const projectDetails = useSelector(
    (state) => state.projects.projectDetails.selected
  );
  const isChangeStatusApiFalied = useSelector(
    (state) => state.projects.boardStatusChangeInProgress.isFailed
  );

  // const changeStatusApiInProgress = useSelector(
  //   (state) => state.projects.boardStatusChangeInProgress.value
  // );

  // *********************************************************Local Use State*********************************************************//
  const [issueList, setIssuesList] = useState({
    Pending: [],
    InProgress: [],
    InReview: [],
    Done: [],
  });
  const [backupIssueList, setBackUpIssuesList] = useState({});
  const [dateType, setDateType] = useState("week");
  const [searchIssue, setSearchIssue] = useState("");
  let [urlDateType, setUrlDateType] = useSearchParams();
  const [changeStatusApiInProgress, setChangeStatusApiInProgress] =
    useState(false);

  // *********************************************************FUNCTIONS******************************************************//
  const setQueryParams = ({ key, value }) => {
    if (isEmpty(value)) {
      setUrlDateType({});
    } else {
      const status = urlDateType.entries();
      setUrlDateType({ [key]: value, ...status });
    }
  };
  const handleToggleChange = (event, newToggle) => {
    if (newToggle !== null) {
      setDateType(newToggle);
      setQueryParams({ key: "dateRange", value: newToggle });
    }
  };
  const changeIssueStatus = async ({ _id, stack }) => {
    dispatch(
      thunks["projects/changeIssueStatus"]({
        _id: _id,
        projectId: projectDetails._id,
        status: stack,
      })
    );
  };
  const handleDrop = (item, stack) => {
    if (!isEmpty(_issueList)) {
      setChangeStatusApiInProgress(true);
      changeIssueStatus({ _id: item.id, stack })
        .then(() => {
          getIssuesListByDateRange();
          setChangeStatusApiInProgress(false);
        })
        .catch(() => {
          dispatch(actions.resetIssueStatusApiTrackStatus());
          setChangeStatusApiInProgress(false);
        });
    }
  };

  // ********************************************************* Hooks ********************************************************* //

  useEffect(() => {
   
    setIssuesList(_issueList);
    setBackUpIssuesList(_issueList);
    if (isChangeStatusApiFalied) {
      dispatch(actions.resetIssueStatusApiTrackStatus());
    }
  }, [_issueList, isChangeStatusApiFalied]);

  function getIssuesListByDateRange() {
    dispatch(
      thunks["projects/getIssueByDateRange"]({
        rangeType: dateType,
        projectId: projectDetails._id,
      })
    );
  }

  useEffect(() => {
    if (!isEmpty(projectDetails)) {
      getIssuesListByDateRange()
    }
  }, [projectDetails, dateType]);

  useEffect(() => {
    const _urlDateType = urlDateType.get("dateRange");
    if (!isEmpty(_urlDateType)) {
      setDateType(_urlDateType);
    }
  }, []);

  return (
    <Container maxWidth="false" sx={{ mt: 2 }}>
      <DndProvider backend={HTML5Backend}>
        <Grid container sx={{ my: 2 }}>
          <Grid item xs={7} display="flex" justifyContent="start">
            <TextField
              value={searchIssue}
              variant="standard"
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ width: "40%" }}
              onChange={(e) => {
                const term = e.target.value;
                setSearchIssue(term);
                if (!/^\s*$/.test(term)) {
                  clearTimeout(typingTimer);
                  typingTimer = setTimeout(function () {
                    const filteredData = {};
                    Object.entries(backupIssueList).forEach((data) => {
                      const [key, value] = data;
                      filteredData[key] = [];
                      filteredData[key] = value.filter((data) =>
                        data.summary
                          .toLowerCase()
                          .includes(term.toLocaleLowerCase())
                      );
                    });
                    setIssuesList(filteredData);
                  }, 1000);
                } else {
                  clearTimeout(typingTimer);
                  setIssuesList(backupIssueList);
                }
              }}
            />
          </Grid>
          <Grid item xs={5} display="flex" justifyContent="end">
            <ToggleButtonGroup
              value={dateType}
              exclusive
              onChange={handleToggleChange}
              aria-label="toggle buttons"
            >
              <ToggleButton value="week" aria-label="week">
                Week
              </ToggleButton>
              <ToggleButton value="month" aria-label="month">
                Month
              </ToggleButton>
              <ToggleButton value="year" aria-label="year">
                year
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="center">
          {/* {JSON.stringify(issueList)} */}
          {!isEmpty(issueList) &&
            boardConstants.issueTypes.map((data) => (
              <Grid key={data.value} item sm={12} md={5} lg={3}>
                <IssueStack
                  title={data}
                  key={data.value + 1}
                  issues={issueList[data.value] || []}
                  onDrop={(item, value) => handleDrop(item, value)}
                  isLoading={changeStatusApiInProgress}
                />
              </Grid>
            ))}

          {isEmpty(_issueList) &&
            boardConstants.issueTypes.map((data) => (
              <Grid key={data.value} item sm={12} md={5} lg={3}>
                <IssueStack
                  title={data}
                  issues={[]}
                  onDrop={(item, value) => handleDrop(item, value)}
                  isLoading={changeStatusApiInProgress}
                />
              </Grid>
            ))}
        </Grid>
      </DndProvider>
    </Container>
  );
}

export default IssuePage;
