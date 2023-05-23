import React from "react";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import BaseLayout from "../layout/BaseLayout";
import {
  useCartItemsActions,
  useCartItemsData,
} from "../hooks/useCartItemsData.hook";
import { CartProduct } from "../store/cart/cart.types";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import ArrowRight from "@mui/icons-material/ArrowRight";
import DeleteForever from "@mui/icons-material/DeleteForever";

const CheckoutPage = () => {
  const { cartItems, cartTotal } = useCartItemsData();
  const { addCartItem, removeItem, clearCartItem } = useCartItemsActions();

  const handleIncreaseItem = (product: CartProduct) => {
    addCartItem(product);
  };

  const handleDecreaseItem = (product: CartProduct) => {
    removeItem(product);
  };

  const handleRemoveItemComlete = (id: string) => {
    clearCartItem(id);
  };
  return (
    <BaseLayout>
      <Box
        sx={{
          padding: {
            xs: "0.8rem",
            sm: "0.8rem",
            md: "1.6rem",
            lg: "2.4rem",
            xl: "3.2rem",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TableContainer component={Paper}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row-reverse",
              borderBottom: "1px solid",
            }}
          >
            <Typography
              variant="h4"
              color="primary"
              sx={{
                padding: "1rem",
              }}
            >
              TOTAL: ${cartTotal}
            </Typography>
          </Box>
          <Table sx={{ overFlowX: "auto" }}>
            <TableHead>
              <TableRow>
                <TableCell> Product </TableCell>
                <TableCell> Description </TableCell>
                <TableCell> Quantity </TableCell>
                <TableCell> Price </TableCell>
                <TableCell> Action </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography textAlign="center" fontWeight={700}>
                      No items in the cart
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {cartItems.map((cartItem: CartProduct) => (
                <TableRow key={cartItem.id}>
                  <TableCell align="center">
                    <img
                      style={{
                        height: "350px",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                      src={cartItem.imageUrl}
                      alt={`Product ${cartItem.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1"> {cartItem.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <IconButton
                        size="large"
                        color="primary"
                        onClick={() => handleDecreaseItem(cartItem)}
                      >
                        <ArrowLeft />
                      </IconButton>
                      <Typography> {cartItem.quantity}</Typography>
                      <IconButton
                        size="large"
                        color="primary"
                        onClick={() => handleIncreaseItem(cartItem)}
                      >
                        <ArrowRight />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography> ${cartItem.price} </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="large"
                      color="error"
                      onClick={() => handleRemoveItemComlete(cartItem.id)}
                    >
                      <DeleteForever />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </BaseLayout>
  );
};

export default CheckoutPage;
