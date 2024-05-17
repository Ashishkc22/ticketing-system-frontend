// IssueCard.js

import React from "react";
import { useDrag } from "react-dnd";
import { Card, CardContent, Typography } from "@mui/material";

const IssueCard = ({ name, id }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "issue",
    item: { id, name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const truncateSummary = (summary) => {
    const maxLength = 100; // Adjust the maximum length as needed
    if (summary.length > maxLength) {
      return summary.substring(0, maxLength) + "...";
    }
    return summary;
  };


  return (
    <div ref={preview} style={{ background: "#cc", color: "#fff" }}>
      <div
        ref={drag}
      >
        <Card sx={{ my:1 }}>
          <CardContent>
            <Typography variant="body2">Issue Id: {id}</Typography>
            <Typography variant="h6">{truncateSummary(name)}</Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IssueCard;
