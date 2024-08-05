import "./login.css";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import validation from "../../../utils/validation.util";
import { Grid, Collapse } from "@mui/material";
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
import { useParams } from "react-router-dom";

export default function PasswordReset(props) {
  const nav = useNavigate();
  const { token } = useParams();

  const theme = useTheme();
  const dispatch = useDispatch();
  const gridItemStyle = {
    py: 2,
  };
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: {
      valid: false,
      message: "",
    },
    confirmPassword: {
      valid: false,
      message: "",
    },
    password: { valid: false, message: "" },
  });
  const [form, setForm] = useState({
    email: "",
    confirmPassword: "",
    password: "",
  });

  const handleFormSubmit = async () => {
    const isFormValid = validation.validateForm({
      form,
      validation: {
        ...(!token && {
          email: {
            key: "email",
            type: "email",
            isRequered: true,
            regex: REGEX.email,
          },
        }),
        ...(token && {
          confirmPassword: {
            key: "password",
            type: "password",
            isRequered: true,
            regex: REGEX.password,
          },
          password: {
            key: "password",
            type: "password",
            isRequered: true,
            regex: REGEX.password,
          },
        }),
      },
      setErrors: setErrors,
      errors,
    });
    if (isFormValid && !token) {
      setButtonLoading(true);
      const result = await dispatch(
        thunks["auth/forgotPassword"]({ email: form.email })
      );
      if (result.payload.data.message != "successfull") {
        setErrors({
          ...Collapse.errors,
          email: {
            valid: true,
            message: result.payload.data.message,
          },
        });
      }else{
        enqueueSnackbar(result.payload?.data?.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
      }
      setButtonLoading(false);
    } else if (isFormValid) {
      const result = await dispatch(
        thunks["auth/resetPassword"]({
          password: form.password,
          confirmPassword: form.confirmPassword,
          token,
        })
      );
      if (result.payload.data?.message != "successfull" || result.payload?.error) {
        enqueueSnackbar(result.payload?.data?.message || result.payload?.error?.join(), {
          variant: "error",
          autoHideDuration: 2000,
        });
      }else{
        enqueueSnackbar("successfull", {
          variant: "success",
          autoHideDuration: 2000,
        });
        nav("/auth/login")
      }
    }
  };

  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={window.innerHeight}
      sx={{
        background: "aliceblue",
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
                Reset Your Password
              </Typography>
            </Grid>
            {!token ? (
              <div>
                <Grid item sx={gridItemStyle}>
                  <TextField
                    label="Email"
                    id="emailField"
                    variant="standard"
                    error={errors.email.valid}
                    helperText={errors.email.message}
                    fullWidth
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target?.value })
                    }
                  />
                </Grid>
                <Grid item sx={gridItemStyle}>
                  <LoadingButton
                    loading={isButtonLoading}
                    className="gradient-button"
                    sx={{
                      width: "100%",
                      background:
                        "linear-gradient(to right, rgb(106 221 178 / 53%), rgb(140 91 216 / 50%))",
                      color: "#fff",
                      "&:hover": {
                        background:
                          "linear-gradient(to right, rgb(91 193 155 / 67%), rgb(157 122 212 / 66%))",
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
                    <span
                      className={!isButtonLoading ? "text-white-color" : ""}
                    >
                      Continue
                    </span>
                  </LoadingButton>
                </Grid>
              </div>
            ) : (
              <div>
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
                  <FormControl sx={{ width: "100%" }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-confirm-password">
                      Confirm Password
                    </InputLabel>
                    <Input
                      id="standard-adornment-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      error={errors.confirmPassword.valid}
                      onChange={(e) =>
                        setForm({ ...form, confirmPassword: e.target?.value })
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowConfirmPassword(!showConfirmPassword);
                            }}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
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
                      background:
                        "linear-gradient(to right, rgb(106 221 178 / 53%), rgb(140 91 216 / 50%))",
                      color: "#fff",
                      "&:hover": {
                        background:
                          "background: linear-gradient(to right, rgb(91 193 155 / 67%), rgb(157 122 212 / 66%))",
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
                    <span
                      className={!isButtonLoading ? "text-white-color" : ""}
                    >
                      Reset password
                    </span>
                  </LoadingButton>
                </Grid>
              </div>
            )}
          </Grid>
          <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
            <Grid item>
              <NavLink
                to="/auth/login"
                className="links"
                style={{
                  textDecoration: "none",
                  color: theme.palette.primary.main,
                }}
              >
                <Typography gutterBottom sx={{ fontWeight: 100 }}>
                  Sign In
                </Typography>
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
}
