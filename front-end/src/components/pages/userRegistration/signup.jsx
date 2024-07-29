/* eslint-disable react-hooks/rules-of-hooks */
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import validation from "../../../utils/validation.util";
import { Box, Button, Grid, Collapse, FormHelperText } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import authService from "../../../services/auth";
import REGEX from "../../../constants/regex";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { enqueueSnackbar } from "notistack";
import { NavLink, useNavigate } from "react-router-dom";

export default function signup() {
  const nav = useNavigate();
  const paperStyle = styled("paper")(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      backgroundColor: red[500],
    },
    [theme.breakpoints.up("md")]: {
      backgroundColor: blue[500],
    },
    [theme.breakpoints.up("lg")]: {
      backgroundColor: green[500],
    },
  }));
  const theme = useTheme();
  const gridItemStyle = {
    py: 2,
  };
  const [errors, setErrors] = useState({
    email: {
      valid: false,
      message: "",
    },
    phone: { valid: false, message: "" },
    password: { valid: false, message: "" },
    confirmPassword: { valid: false, message: "" },
  });
  const [confirmPasswordErrors, setConfirmPasswordErrors] = useState({
    valid: false,
    message: "",
  });
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
        phone: {
          key: "phone",
          type: "phone",
          isRequered: true,
          regex: REGEX.phone,
        },
      },
      setErrors: setErrors,
      errors,
    });
    const didPasswordMatched = form.confirmPassword != form.password;
    if (didPasswordMatched) {
      setConfirmPasswordErrors({
        valid: true,
        message: "Password match failed.",
      });
    } else {
      setConfirmPasswordErrors({
        valid: false,
        message: "",
      });
    }
    if (isFormValid) {
      try {
        authService.registration(form);
        enqueueSnackbar("user created successful.", {
          variant: "success",
          autoHideDuration: 2000,
        });
        nav("/auth/login");
      } catch (error) {
        enqueueSnackbar(error?.message || "Failed to create user.", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    }
  }

  const [showPassword, setshowPassword] = useState(false);
  const [showPassword2, setshowPassword2] = useState(false);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      // className="login-background"
      sx={{
        background: 'aliceblue',
        padding: 3,
      }}
    >
      <paperStyle>
        <Paper
          sx={{
            maxWidth: 500,
            width: "100%",
            p: 4,
          }}
        >
          <Grid container textAlign="center" direction="column">
            <Grid item sx={gridItemStyle}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Create account
              </Typography>
            </Grid>
            {/* <Grid item sx={gridItemStyle}>
              <TextField
                label="Mobile no."
                variant="standard"
                error={errors.phone.valid}
                helperText={errors.phone.message}
                fullWidth
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target?.value })}
              />
            </Grid> */}
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
                    * One number and one special character
                  </Typography>
                </div>
              </Collapse>
            </Grid>
            <Grid item sx={gridItemStyle}>
              <FormControl sx={{ width: "100%" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Confirm password
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword2 ? "text" : "password"}
                  error={confirmPasswordErrors.valid}
                  //   helperText={confirmPasswordErrors.message}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target?.value })
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={(e) => {
                          e.preventDefault();
                          setshowPassword2(!showPassword2);
                        }}
                        edge="end"
                      >
                        {showPassword2 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <Collapse in={confirmPasswordErrors.valid}>
                  <FormHelperText error={confirmPasswordErrors.valid}>
                    {confirmPasswordErrors.message}
                  </FormHelperText>
                </Collapse>
              </FormControl>
              {/* <TextField
              label="Password"
              type={show ? "password" : "text"}
              id="PasswordTextField"
              variant="standard"
              fullWidth
            /> */}
            </Grid>
            <Grid item sx={gridItemStyle}>
              <Button
                className="gradient-button"
                sx={{
                  width: "100%",
                  background: "linear-gradient(to right, rgb(106 221 178 / 53%), rgb(140 91 216 / 50%))",
                  color: "#fff",
                  "&:hover": {
                    background: "linear-gradient(to right, rgb(91 193 155 / 67%), rgb(157 122 212 / 66%))",
                  },
                  "& .css-1yt7yx7-MuiLoadingButton-loadingIndicator": {
                    color: "#fff",
                  },
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleFormSubmit(form);
                }}
              >
                Sign up
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between">
            <Grid item>
              <NavLink
                to="/auth/login"
                sx={{ textDecoration: "none" }}
                className="links"
              >
                <Typography
                  gutterBottom
                  sx={{ fontWeight: 100, color: "blue", pt: 2 }}
                >
                  Sign in
                </Typography>
              </NavLink>
            </Grid>
          </Grid>
        </Paper>
      </paperStyle>
    </Box>
  );
}
