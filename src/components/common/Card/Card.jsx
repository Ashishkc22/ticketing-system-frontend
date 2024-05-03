import { Card, Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./card.css";
import { CardActionArea, LinearProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

export default function ProjectCard({
  width,
  projectName = "",
  color = "",
  isLoading = false,
  action,
  isSelected = false,
  deleteAction,
  editAction,
  id,
}) {
  return (
    <Card sx={{ width }}>
      {isLoading && <LinearProgress />}
      <CardActionArea
        disabled={isLoading}
        onClick={() => {
          if (action) {
            action();
          }
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>{isSelected && <div className="dot" />}</Grid>
          <Grid item sx={{ pr: 2 }}>
            <IconButton
              aria-label="delete"
              size="large"
              sx={{ color: "#f44336" }}
            >
              <DeleteIcon
                onClick={(e) => {
                  e.stopPropagation();
                  deleteAction(id);
                }}
              />
            </IconButton>
          </Grid>
        </Grid>

        <Box
          sx={{
            height: 90,
            minWidth: 300,
            backgroundColor: color,
          }}
        ></Box>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {projectName}
          </Typography>
          <IconButton
            aria-label="delete"
            size="large"
            sx={{ color: "#974998" }}
          >
            <EditIcon
              onClick={(e) => {
                e.stopPropagation();
                editAction();
              }}
            />
          </IconButton>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
