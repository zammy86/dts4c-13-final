import React, { useEffect } from "react";
import "./styles/navbar.scss";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import {
  Container,
  Button,
  Menu,
  MenuItem,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import DehazeIcon from "@mui/icons-material/Dehaze";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ThemeContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { authFirebase } from "../services/firebase/base";
import { handleLogout } from "../redux/authentication";

export const Navbar = () => {
  const mode = useContext(ThemeContext);
  // console.log(mode);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handelClickLogout = () => {
    signOut(authFirebase).then(() => {
      dispatch(handleLogout());
    });
  };

  const handleSearch = (e) => {
    if (e.code === "Enter") {
      const value = e.target.value;
      navigate(`/search/${value}`);
    }
  };
  return (
    <div className="wrapper" id={mode.theme}>
      <Container className="container">
        <div className="navbar-section">
          <div className="navbar-left">
            <Link className="link" to="/">
              <div className="title1">News</div>
              <div className="title2">Portal</div>
            </Link>
          </div>
          <div className="navbar-right">
            <div className="search-wrapper">
              <Search className="search">
                <SearchIconWrapper className="search-icon-wrapper">
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  className="search-input"
                  placeholder="Enter Text Search…"
                  inputProps={{ "aria-label": "search" }}
                  onKeyDown={(e) => {
                    handleSearch(e);
                  }}
                />
              </Search>
            </div>
            <FormGroup>
              <FormControlLabel
                control={
                  <MaterialUISwitch
                    sx={{ m: 1 }}
                    onChange={mode.toggleTheme}
                    checked={mode.theme === "dark"}
                  />
                }
              />
            </FormGroup>
            =======
            <div>
              {/* <FormGroup>
                <FormControlLabel
                  control={
                    <MaterialUISwitch
                      sx={{ m: 1 }}
                      onChange={mode.toggleTheme}
                      checked={mode.theme === "dark"}
                    />
                  }
                />
              </FormGroup> */}
            </div>
            {/* <div className="search">
              <SearchIcon />
            </div> */}
            <div className="dropdown">
              <Button
                className="menu"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <DehazeIcon className="menu-icon" />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>
                  <Link className="link" to="/">
                    Home
                  </Link>
                </MenuItem>

                {/* Login oR Logout */}
                {authStore.userData ? (
                  <MenuItem>
                    <Link
                      className="link"
                      onClick={(e) => {
                        e.preventDefault();
                        handelClickLogout();
                      }}
                    >
                      {`Logout (${
                        authStore.userData && authStore.userData.displayName
                      })`}
                    </Link>
                  </MenuItem>
                ) : (
                  <MenuItem>
                    <Link className="link" to="/login">
                      Login
                    </Link>
                  </MenuItem>
                )}
              </Menu>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
