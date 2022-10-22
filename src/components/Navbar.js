import React, { useEffect } from "react";
import "./styles/navbar.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Menu, MenuItem } from "@mui/material";
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

  const dispatch = useDispatch()
  const authStore = useSelector(state => state.auth)
  
  const handelClickLogout = () => {
    signOut(authFirebase).then(() => {
      dispatch(handleLogout())
    })
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
            <div className="search">
              <SearchIcon />
            </div>
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
                  <Link className="link" onClick={() => {handelClickLogout()}}>
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
