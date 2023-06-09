/* eslint-disable react-hooks/rules-of-hooks */
import "./login.css";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";

import { Box, Button, Grid, OutlinedInput, InputLabel } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import authService from "../../../services/auth";

function handleFormChange({ e, name, setForm, form }) {
  if (e.target?.value) {
    setForm({
      ...form,
      [name]: e.target.value,
    });
  } else {
    console.error("got empty value in handleFormChange in Login page.");
  }
}

function handleFormSubmit(form) {
  authService.login();
  console.log("form", form);
  console.log('theme.breakpoints.down("md")', theme.breakpoints.down("md"));
}

export default function loginPage() {
  const theme = useTheme();
  console.log("theme", theme);
  const gridItemStyle = {
    py: 2,
  };
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  const [setShow, show] = useState(false);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      className="login-background"
    >
      <Paper
        sx={{
          width: theme.breakpoints.down("md") ? "30%" : "20%",
          height: "50vh",
          p: 4,
        }}
      >
        <Grid container textAlign="center" direction="column">
          <Grid item sx={gridItemStyle}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              User Login
            </Typography>
          </Grid>
          <Grid item sx={gridItemStyle}>
            <TextField
              label="User name"
              id="UserNameTextField"
              variant="standard"
              fullWidth
              value={form.username}
              onChange={(e) =>
                handleFormChange({ e, name: "userName", setForm, form })
              }
            />
          </Grid>
          <Grid item sx={gridItemStyle}>
            {/* <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            /> */}
            <TextField
              label="Password"
              type={show ? "password" : "text"}
              id="PasswordTextField"
              variant="standard"
              e
              fullWidth
              onChange={(e) =>
                handleFormChange({ e, name: "password", setForm, form })
              }
            />
          </Grid>
          <Grid item sx={gridItemStyle}>
            <div>
              <Button
                sx={{ width: "100%" }}
                className="gradient-button"
                onClick={() => handleFormSubmit(form)}
              >
                Sign In
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
