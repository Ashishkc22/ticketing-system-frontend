import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NotFoundPage = () => {
  const history = useNavigate();

  const redirectToHome = () => {
    history("/");
  };

  const redirectToPreviousPage = () => {
    history(-1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for might be in another castle.</p>
      <Grid
        container
        style={{ marginTop: "20px", justifyContent: "center" }}
        columnGap={2}
      >
        <Grid item>
          <Link
            component="button"
            color="primary"
            onClick={redirectToHome}
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <HomeIcon sx={{ mr: "8px" }} /> Go to Home
          </Link>
        </Grid>
        <Grid item>
          <Link
            component="button"
            color="secondary"
            onClick={redirectToPreviousPage}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <ArrowBackIcon sx={{ mr: "5px" }} />
            Go Back
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFoundPage;
