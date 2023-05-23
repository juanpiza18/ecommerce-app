import React from "react";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import StoreMallDirectory from "@mui/icons-material/StoreMallDirectory";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOut } from "../../store/user/user.actions";
import { useCartItemsData } from "../../hooks/useCartItemsData.hook";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleNavigation = (url: string) => {
    navigate(url);
  };
  const handleLogout = () => {
    dispatch(signOut());
  };
  const currentUser = useAppSelector(selectCurrentUser);
  const { cartCount } = useCartItemsData();
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "black",
        color: "white",
      }}
    >
      <Toolbar>
        <StoreMallDirectory
          sx={{ display: { xs: "none", md: "flex", lg: "flex" }, mr: 1 }}
        />
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          E-Commerce APP
        </Typography>
        <Box
          alignItems="center"
          justifyContent="space-between"
          sx={{
            display: { xs: "none", md: "flex", lg: "flex" },
            padding: "10px",
            width: "400px",
          }}
        >
          <Button
            variant="text"
            color="inherit"
            onClick={() => handleNavigation("/")}
          >
            HOME
          </Button>
          <Button
            variant="text"
            color="inherit"
            onClick={() => handleNavigation("/shop")}
          >
            SHOP
          </Button>
          {currentUser && (
            <Typography component="span">{currentUser.displayName}</Typography>
          )}
          {currentUser ? (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              variant="text"
              color="inherit"
              onClick={() => handleNavigation("/auth")}
            >
              SIGN IN
            </Button>
          )}
          <Button
            variant="contained"
            endIcon={<ShoppingCart fontSize="large" />}
            color="primary"
            size="small"
            onClick={() => handleNavigation("/checkout")}
          >
            CART {cartCount}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
