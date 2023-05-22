import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

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
}

export default function loginPage() {
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
    >
      <Paper
        sx={{
          width: "30vw",
          height: "50vh",
          p: 4,
        }}
      >
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: "Dosis" }}>
              Login
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
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
          <Grid item xs={12} md={6} lg={12}>
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
          <Grid item xs={12} md={6} lg={12}>
            <Button onClick={() => handleFormSubmit(form)}>Sign In</Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
