import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useDrop } from "react-dnd";
import IssueCard from "./IssueCard";

const IssueStack = ({ title, issues, onDrop,isLoading = false }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "issue",
    drop: (item) => onDrop(item, title.value),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Box
      ref={drop}
      component={Paper}
      sx={{
        position: 'relative',  // Ensure the backdrop positions correctly
        p: 1,
        borderColor: isOver ? "primary.main" : "grey.500",
        background: "whitesmoke",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title.name}
      </Typography>
      <Box
        sx={{
          p: 2,
          height: "600px",
          overflow: "scroll",
          pointerEvents: isLoading ? 'none' : 'auto',  // Disable interactions when loading
          opacity: isLoading ? 0.5 : 1,  // Dim the content when loading
        }}
      >
        {issues.map((issue) => (
          <IssueCard key={issue._id} name={issue.summary} id={issue._id} status={issue.status} />
        ))}
      </Box>
      {isLoading && (
        <Backdrop
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Box>
  );
};

export default IssueStack;
