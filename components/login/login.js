import React, { useContext } from "react";
// import Router from "next/router";
import Alert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { LoginApi } from "../../apiCalls";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);

  const StoreUserData = (data) => {
    if (data) {
      localStorage.setItem(
        "storingAuthTokens",
        // JSON.stringify(data.accessToken)
        JSON.stringify(
          "sdfsdfsadfsdjkfghdsjklgfdsjgklhfdjhglkjdsfhglkdjfhgsdfg"
        )
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    setError(false);
    LoginApi(email, password)
      .then((data) => {
        console.log(data, "61");
        StoreUserData(data);
        setOpen(true);
        setTimeout(() => {
          window.location.reload();
        }, 100);
      })
      .catch((err) => setError(true));
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            {open && (
              <Alert severity={"success"} style={{ margin: "10px 0px" }}>
                Login Success
              </Alert>
            )}
            {error && (
              <Alert severity={"error"} style={{ margin: "10px 0px" }}>
                Login error
              </Alert>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              type="email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value);
                setOpen(false);
                setError(false);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
                setOpen(false);
                setError(false);
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    </div>
  );
}
