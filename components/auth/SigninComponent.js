import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
// Import Link from next/link
import Link from "next/link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Router from "next/router";
import * as React from "react";
import { useEffect, useState } from "react";
import { authenticate, isAuth, signin } from "../../actions/auth";
import LoginGoogle from "./LoginGoogle";

const theme = createTheme();

export default function SigninComponent() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push(`/`);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: "" });
    const user = { email, password };

    try {
      const data = await signin(user);
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push(`/admin`);
          } else {
            Router.push(`/user`);
          }
        });
      }
    } catch (error) {
      console.error("Signin error:", error);
      setValues({ ...values, error: "An unexpected error occurred", loading: false });
    }
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: "", [name]: e.target.value });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              onChange={handleChange("email")}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={handleChange("password")}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                color: "#ffffff",
                backgroundColor: "#121212",
                "&:hover": {
                  backgroundColor: "#121212",
                },
              }}
            >
              Sign In
            </Button>

            <div>
              <LoginGoogle />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <div className="alert alert-info">Loading...</div>}

            <Grid container>
              <Grid item xs>
                <Link href="/auth/password/forgot">
                  {/* Remove the <a> tag */}
                  Forgot password
                </Link>
              </Grid>
              <Grid item>
                {/* Use passHref prop */}
                <Link href="/signup" passHref>
                  {/* Remove the <a> tag */}
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
