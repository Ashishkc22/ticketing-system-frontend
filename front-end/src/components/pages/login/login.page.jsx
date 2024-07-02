/* eslint-disable react-hooks/rules-of-hooks */
import "./login.css";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import validation from "../../../utils/validation.util";
import { Box, Grid, Collapse } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import REGEX from "../../../constants/regex";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { NavLink, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { thunks } from "../../../store/common";

// console.log("thunks-----", thunks);

export default function LoginPage() {
  const nav = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const gridItemStyle = {
    py: 2,
  };
  const [isButtonLoading, setButtonLoading] = useState(false);
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

  const handleFormSubmit = async () => {
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
          key: "password",
          type: "password",
          isRequered: true,
          regex: REGEX.password,
        },
      },
      setErrors: setErrors,
      errors,
    });
    if (isFormValid) {
      setButtonLoading(true);
      const result = await dispatch(thunks["auth/login"](form));
      if (!result?.error) {
        enqueueSnackbar("Login successful.", {
          variant: "success",
          autoHideDuration: 2000,
        });
        setTimeout(() => {
          nav("/");
          setButtonLoading(false);
        }, 1000);
      } else {
        enqueueSnackbar(result?.error?.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
        setButtonLoading(false);
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      className="login-background"
      sx={{
        background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        padding: 3,
      }}
    >
      <Paper
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
          borderRadius: 3,
          boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
        }}
      >
        <form>
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
                  error={errors.password.valid}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target?.value })
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPassword(!showPassword);
                        }}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Collapse in={errors.password.valid}>
                <div style={{ textAlign: "initial", paddingTop: "10px" }}>
                  <Typography sx={{ color: "red" }}>
                    * Minimum eight characters
                  </Typography>
                  <Typography sx={{ color: "red" }}>
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
              <LoadingButton
                loading={isButtonLoading}
                className="gradient-button"
                sx={{
                  width: "100%",
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                  color: "#fff",
                  "&:hover": {
                    background: "linear-gradient(to right, #00a08b, #85b92c)",
                  },
                  "& .css-1yt7yx7-MuiLoadingButton-loadingIndicator": {
                    color: "#fff",
                  },
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleFormSubmit();
                }}
              >
                <span className={!isButtonLoading ? "text-white-color" : ""}>
                  Login
                </span>
              </LoadingButton>
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
            <Grid item>
              <NavLink
                to="/auth/registration"
                className="links"
                style={{ textDecoration: "none", color: theme.palette.primary.main }}
              >
                <Typography gutterBottom sx={{ fontWeight: 100 }}>
                  Create account
                </Typography>
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to="/auth/forgot-password" className="links" style={{ textDecoration: "none", color: theme.palette.primary.main }}>
                <Typography gutterBottom sx={{ fontWeight: 100 }}>
                  Forgot password?
                </Typography>
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
