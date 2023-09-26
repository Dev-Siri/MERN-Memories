import { Lock } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import jwtDecode from "jwt-decode";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import type { User } from "../../types";

import { useMutation } from "@tanstack/react-query";
import { login, signup, type UserFormData } from "../../api";
import useAuthStore from "../../store/auth";
import useStyles from "./styles";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const styles = useStyles();
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const { mutate, isLoading } = useMutation({
    mutationFn: isSignup ? signup : login,
    onSuccess({ data }) {
      const { token } = data as { token: string };
      localStorage.setItem("profile", token);

      const user = jwtDecode<User>(token);
      setUser(user);
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    if (isSignup) {
      mutate({ ...user, username } as UserFormData);
    } else {
      mutate(user as UserFormData);
    }

    navigate("/");
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" p={10}>
      <Paper component="form" sx={styles.form} onSubmit={handleSubmit}>
        <Typography variant="h5">
          {isSignup ? "Create an account" : "Login to your account"}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Avatar sx={styles.lockIcon}>
            <Lock fontSize="large" />
          </Avatar>
        </Box>
        <Box display="flex" flexDirection="column" mt={1} gap={1}>
          {isSignup && (
            <TextField
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <TextField
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={styles.submitButton}
          >
            {isSignup ? "Signup" : "Login"}
            {isLoading && <CircularProgress color="inherit" size={20} />}
          </Button>
          <Button
            type="button"
            variant="text"
            size="small"
            color="inherit"
            onClick={() => setIsSignup((prevIsSignup) => !prevIsSignup)}
          >
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Signup"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
