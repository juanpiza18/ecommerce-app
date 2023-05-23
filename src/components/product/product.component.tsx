import { Box, Button, Chip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductData } from "../../hooks/useProductData.hook";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import { useCartItemsActions } from "../../hooks/useCartItemsData.hook";

const Product = () => {
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();
  const { productByCategoryAndId } = useProductData(category, productId);
  const { addCartItem } = useCartItemsActions();
  const [productFound, setProductFound] = useState(false);
  useEffect(() => {
    if (productByCategoryAndId) {
      setProductFound(true);
    } else {
      setProductFound(false);
    }
  }, [productByCategoryAndId]);
  const handleAddToCart = () => {
    addCartItem(productByCategoryAndId);
  };
  return (
    <Box
      sx={{
        padding: "2rem",
      }}
    >
      {!productFound && (
        <Typography
          sx={{
            textAlign: "center",
          }}
        >
          No Product Found
        </Typography>
      )}
      {productByCategoryAndId && (
        <Box
          sx={(theme) => ({
            display: "flex",
            justifyContent: "space-around",
            boxShadow: `${theme.shadows[11]}`,
          })}
        >
          <img
            style={{
              height: "450px",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
            }}
            src={productByCategoryAndId.imageUrl}
            alt={`Product ${productByCategoryAndId.name}`}
          />
          <Box
            sx={{
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Typography variant="h2" color="primary">
              {productByCategoryAndId.name}
            </Typography>
            <Typography variant="body1">
              {productByCategoryAndId.description}
            </Typography>
            <Typography fontWeight={700} variant="body1" color="secondary">
              {productByCategoryAndId.availableItems} available items.
            </Typography>
            <Chip
              variant="filled"
              color="primary"
              label={<Typography>${productByCategoryAndId.price}</Typography>}
            />
            <Button
              onClick={handleAddToCart}
              variant="text"
              color="tertiary"
              startIcon={<AddShoppingCart />}
            >
              Add to cart
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Product;
