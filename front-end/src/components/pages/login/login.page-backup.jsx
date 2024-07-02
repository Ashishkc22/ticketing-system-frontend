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

export default function loginPage() {
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
      setButtonLoading(true);
      const result = await dispatch(thunks["auth/login"](form));
      if (!result?.error) {
        enqueueSnackbar("login successful.", {
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
              <LoadingButton
                loading={isButtonLoading}
                className="gradient-button"
                sx={{
                  width: "100%",
                  "& .css-1yt7yx7-MuiLoadingButton-loadingIndicator": {
                    color: "#001feb",
                  },
                }}
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleFormSubmit(form);
                }}
              >
                <span className={!isButtonLoading && "text-white-color"}>
                  Login
                </span>
              </LoadingButton>
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between">
            <Grid item>
              <NavLink
                to="/auth/registration"
                sx={{ textDecoration: "none" }}
                className="links"
              >
                <Typography
                  gutterBottom
                  sx={{ fontWeight: 100, color: "blue" }}
                >
                  Create account
                </Typography>
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink sx={{ textDecoration: "none" }} className="links">
                <Typography
                  gutterBottom
                  sx={{ fontWeight: 100, color: "blue" }}
                >
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
