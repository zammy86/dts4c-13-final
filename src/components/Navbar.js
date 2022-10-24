import React, { useEffect } from "react";
import "./styles/navbar.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { Container, Button, Menu, MenuItem, FormGroup, FormControlLabel} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import DehazeIcon from "@mui/icons-material/Dehaze";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { authFirebase } from "../services/firebase/base";
import { handleLogout } from "../redux/authentication";

export const Navbar = () => {
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
  const dispatch = useDispatch()
  const authStore = useSelector(state => state.auth)
  const navigate = useNavigate()

  const handelClickLogout = () => {
    signOut(authFirebase).then(() => {
      dispatch(handleLogout())
    })
  }

  
  const handleSearch = (e) => {
    if (e.code === 'Enter') {
      const value = e.target.value
      navigate(`/search/${value}`)  
    }
  }
  return (
    <div className="wrapper">
      <Container>
        <div className="navbar-section">
          <div>
            <Link className="link" to="/">
              <h2>News</h2>
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
                  onKeyDown={(e) => {handleSearch(e)}}
                />
              </Search>
            </div>
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
                <MenuItem>
                  <Link className="link" to="/about">
                    About
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link className="link" to="/profile">
                    Profile
                  </Link>
                </MenuItem>
                {/* Login oR Logout */}
                { (authStore.userData) ? (
                  <MenuItem>
                  <Link className="link" onClick={(e) => {
                        e.preventDefault() 
                        handelClickLogout()}
                        }
                  >
                    {`Logout (${authStore.userData && authStore.userData.displayName})`}
                  </Link>
                </MenuItem>
                ) : (
                <MenuItem>
                  <Link className="link" to="/login">
                    Login
                  </Link>
                </MenuItem>
                )
                }
              </Menu>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
