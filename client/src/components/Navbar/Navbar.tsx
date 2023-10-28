import { Logout } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import useAuthStore from "../../store/auth";
import useStyles from "./styles";

export default function Navbar() {
  const { user, setUser } = useAuthStore();
  const shouldShowLogoText = useMediaQuery("(min-width: 724px)");
  const navigate = useNavigate();
  const styles = useStyles();

  function logout() {
    localStorage.removeItem("profile");
    setUser(null);

    navigate("/auth");
  }

  return (
    <AppBar position="static" color="transparent" sx={styles.appBar}>
      <Box sx={styles.container}>
        <Link to="/" style={styles.logo}>
          <img src="/logo.png" alt="logo" height={60} width={60} />
          {shouldShowLogoText && (
            <img src="/logo-txt.png" alt="logo text" height={50} width={270} />
          )}
        </Link>
        {user ? (
          <Box display="flex" gap={1} alignItems="center">
            <Box display="flex" flexDirection="column" alignItems="end">
              <Typography variant="body1">{user.username}</Typography>
              <Typography variant="caption" color="gray">
                {user.email}
              </Typography>
            </Box>
            <Avatar sx={styles.userIcon}>{user.username[0]}</Avatar>
            <Tooltip title="Logout">
              <IconButton aria-label="Logout" onClick={logout}>
                <Logout />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          // @ts-expect-error
          <Button
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            sx={styles.login}
          >
            Login
          </Button>
        )}
      </Box>
    </AppBar>
  );
}
