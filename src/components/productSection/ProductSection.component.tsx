import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { ProductItem as ProductItemType } from "../../store/shop/shop.types";
import ProductItem from "../productItem/Product-Item.component";

export type ProductSectionProps = {
  products: ProductItemType[];
  title: string;
};

const ProductSection = ({ title, products }: ProductSectionProps) => {
  return (
    <Box
      className="product_section"
      sx={{
        display: "flex",
        flexDirection: "column",
        "&.product_section:not(:first-of-type)": {
          marginTop: "2rem",
        },
        alignItems: {
          xs: "unset",
          md: "center",
        },
      }}
    >
      <Link to={`${title}`} className="link">
        <Typography
          variant="h2"
          fontSize="2rem"
          sx={{
            textTransform: "uppercase",
          }}
        >
          {title}
        </Typography>
      </Link>
      <Box
        sx={{
          display: "grid",
          marginTop: "1rem",
          gridTemplateColumns: {
            xs: "1fr 1fr",
            md: "repeat(4, 1fr)",
          },
          columnGap: {
            xs: "1rem",
            md: "1.5rem",
          },
        }}
      >
        {products
          .filter((value, index) => index < 4)
          .map((item) => {
            const product = { ...item, category: title };
            return <ProductItem key={item.id} product={product} />;
          })}
      </Box>
    </Box>
  );
};

export default ProductSection;
