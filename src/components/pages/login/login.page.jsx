/* eslint-disable react-hooks/rules-of-hooks */
import "./login.css";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import validation from "../../../utils/validation.util";
import { Box, Button, Grid, Collapse, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import authService from "../../../services/auth";
import REGEX from "../../../constants/regex";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { NavLink } from "react-router-dom";

export default function loginPage() {
  const theme = useTheme();
  const gridItemStyle = {
    py: 2,
  };
  const [errors, setErrors] = useState({
    email: {
      valid: false,
      message: "",
    },
    password: { valid: false, message: "" },
  });
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleFormSubmit() {
    const isFormValid = validation.validateForm({
      form,
      validation: {
        email: {
          key: "email",
          type: "email",
          isRequered: true,
          regex: REGEX.email,
        },
        password: {
          key: "pasword",
          type: "password",
          isRequered: true,
          regex: REGEX.password,
        },
      },
      setErrors: setErrors,
      errors,
    });
    if (isFormValid) {
      authService.login(form);
    }
  }

  const [showPassword, setshowPassword] = useState(false);
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
          p: 4,
        }}
        lg={{
          width: "25%",
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
              label="Email"
              id="UserNameTextField"
              variant="standard"
              error={errors.email.valid}
              helperText={errors.email.message}
              fullWidth
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target?.value })}
            />
          </Grid>
          <Grid item sx={gridItemStyle}>
            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                label="Password"
                error={errors.password.valid}
                helperText={errors.password.message}
                onChange={(e) =>
                  setForm({ ...form, password: e.target?.value })
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={(e) => {
                        e.preventDefault();
                        setshowPassword(!showPassword);
                      }}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {/* <TextField
              label="Password"
              type={show ? "password" : "text"}
              id="PasswordTextField"
              variant="standard"
              fullWidth
            /> */}
            <Collapse in={errors.password.valid}>
              <div style={{ "text-align": "initial", "padding-top": "10px" }}>
                <Typography sx={{ color: "red", alignItems: "start" }}>
                  * Minimum eight characters
                </Typography>

                <Typography sx={{ color: "red" }} primary="">
                  * At least one uppercase letter
                </Typography>

                <Typography sx={{ color: "red" }}>
                  * One lowercase letter
                </Typography>

                <Typography sx={{ color: "red" }}>
                  * one number and one special character
                </Typography>
              </div>
            </Collapse>
          </Grid>
          <Grid item sx={gridItemStyle}>
            <Button
              sx={{ width: "100%" }}
              className="gradient-button"
              onClick={(e) => {
                e.preventDefault();
                handleFormSubmit(form);
              }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between">
          <Grid item>
            <NavLink
              to="/auth/registration"
              sx={{ textDecoration: "none" }}
              className="links"
            >
              <Typography gutterBottom sx={{ fontWeight: 100, color: "blue" }}>
                Create account
              </Typography>
            </NavLink>
          </Grid>
          <Grid item>
            <NavLink sx={{ textDecoration: "none" }} className="links">
              <Typography gutterBottom sx={{ fontWeight: 100, color: "blue" }}>
                Forgot password?
              </Typography>
            </NavLink>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
