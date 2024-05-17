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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import { thunks, actions } from "../../../store/projects";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

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

  const changeStatusApiInProgress = useSelector(
    (state) => state.projects.boardStatusChangeInProgress.value
  );

  // *********************************************************Local Use State*********************************************************//
  const [issuesList, setIssuesList] = useState(_issueList);
  const [dateType, setDateType] = useState("week");
  const [searchIssue, setSearchIssue] = useState("");

  // *********************************************************FUNCTIONS******************************************************//
  const handleToggleChange = (event, newToggle) => {
    if (newToggle !== null) {
      setDateType(newToggle);
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
    if (!isEmpty(issuesList)) {
      changeIssueStatus({ _id: item.id, stack }).then(() => {
        console.log("hello");
        setIssuesList(
          issuesList.map((issue) => {
            if (String(issue._id) === item.id) {
              const _issue = { ...issue };
              _issue.status = stack;
              return _issue;
            } else {
              return issue;
            }
          })
        );
      });
    }
  };

  // ********************************************************* Hooks ********************************************************* //

  useEffect(() => {
    if (!isEmpty(_issueList)) {
      console.log("reset called issue list");
      setIssuesList(_issueList);
    }
    if (isChangeStatusApiFalied) {
      dispatch(actions.resetIssueStatusApiTrackStatus());
    }
  }, [_issueList, isChangeStatusApiFalied]);

  useEffect(() => {
    if (!isEmpty(projectDetails)) {
      dispatch(
        thunks["projects/getIssueByDateRange"]({
          rangeType: dateType,
          projectId: projectDetails._id,
        })
      );
    }
  }, [projectDetails, dateType]);

  return (
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
            sx={{ width: "30%" }}
            onChange={(e) => {
              const term = e.target.value;
              setSearchIssue(term);
              if (!/^\s*$/.test(term)) {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(function () {
                  setIssuesList(
                    _issueList.filter((data) => {
                      if (
                        data.summary
                          .toLowerCase()
                          .includes(term.toLocaleLowerCase())
                      ) {
                        return data;
                      } else {
                        return false;
                      }
                    })
                  );
                }, 1500);
              } else {
                setIssuesList(_issueList);
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
        {!isEmpty(issuesList) &&
          boardConstants.issueTypes.map((data) => (
            <Grid key={data.value} item sm={12} md={5} lg={3}>
              <IssueStack
                title={data}
                issues={issuesList.filter(
                  (issue) => issue.status === data.value
                )}
                onDrop={handleDrop}
                isLoading={changeStatusApiInProgress}
              />
            </Grid>
          ))}

        {isEmpty(issuesList) &&
          boardConstants.issueTypes.map((data) => (
            <Grid key={data.value} item sm={12} md={5} lg={3}>
              <IssueStack
                title={data}
                issues={[]}
                onDrop={handleDrop}
                isLoading={changeStatusApiInProgress}
              />
            </Grid>
          ))}
      </Grid>
    </DndProvider>
  );
}

export default IssuePage;
