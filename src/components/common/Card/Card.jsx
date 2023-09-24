import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CardActionArea, LinearProgress } from "@mui/material";

export default function ProjectCard({
  width,
  projectName = "",
  color = "",
  isLoading = false,
  action,
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
          console.log("clicked card");
        }}
      >
        <Box
          sx={{
            height: 90,
            minWidth: 300,
            backgroundColor: color,
          }}
        >
          {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, cumque. */}
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {projectName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
