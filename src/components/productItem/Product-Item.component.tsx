import React from "react";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography,
  Button,
} from "@mui/material";
import { useCartItemsActions } from "../../hooks/useCartItemsData.hook";
import { ProductItem as ProductType } from "../../store/shop/shop.types";
import { Link } from "react-router-dom";

interface ProductItemProps {
  product: ProductType & {
    category?: string;
  };
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { addCartItem } = useCartItemsActions();
  const handleAddToCart = () => {
    const { category, ...productToAdd } = product;
    addCartItem(productToAdd);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link className="link" to={`${product.category}/${product.id}`}>
        <CardHeader title={product.name} subheader={product.category ?? ""} />
      </Link>
      <CardMedia
        component="img"
        height="300"
        image={product.imageUrl}
        alt={`Product ${product.name}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.primary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Chip
          sx={{
            flex: 1,
          }}
          color="primary"
          label={`$ ${product.price}`}
          variant="outlined"
        />
        <Button
          onClick={handleAddToCart}
          variant="text"
          startIcon={<AddShoppingCart />}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
