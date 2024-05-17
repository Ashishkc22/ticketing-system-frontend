import { Card, Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./card.css";
import { CardActionArea, LinearProgress, Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";

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
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <Card sx={{ width }}>
      {isLoading && <LinearProgress />}
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>{isSelected && <div className="dot" />}</Grid>
        <Grid item sx={{ pr: 1, pt: 1 }}>
          <IconButton aria-label="delete" size="large">
            <MoreVertIcon
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
                e.stopPropagation();
                setOpenMenu(!openMenu);
              }}
            />
          </IconButton>
        </Grid>
      </Grid>

      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={(e) => {
          setOpenMenu(false);
        }}
        // PaperProps={{
        //   style: {
        //     maxHeight: ITEM_HEIGHT * 4.5,
        //     width: "20ch",
        //   },
        // }}
      >
        <MenuItem
          sx={{ color: "#f44336" }}
          onClick={(e) => {
            deleteAction(id);
          }}
        >
          <ListItemIcon>
            <DeleteIcon sx={{ fontSize: "20px", color: "#f44336" }} />
          </ListItemIcon>
          <Typography variant="inherit">Delete</Typography>
        </MenuItem>
        <MenuItem
          sx={{ color: "#974998" }}
          onClick={(e) => {
            editAction();
          }}
        >
          <ListItemIcon>
            <EditIcon sx={{ fontSize: "20px", color: "#974998" }} />
          </ListItemIcon>
          <Typography variant="inherit" sx={{ mr: 2 }}>
            Edit
          </Typography>
        </MenuItem>
      </Menu>

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
        <IconButton aria-label="delete" size="large">
          <ArrowForwardIcon
            onClick={(e) => {
              action();
            }}
          />
        </IconButton>
      </CardContent>
    </Card>
  );
}
