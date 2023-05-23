import React from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Spinner from "../spinner/Spinner.component";
import ProductItem from "../productItem/Product-Item.component";
import Search from "../search/Search.component";
// import WithProducts from "../../hoc/withProducts.hoc";
import { useProductData } from "../../hooks/useProductData.hook";

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const {
    filter,
    isLoading,
    productsByCategory,
    categoryProductsFilterBySearch,
  } = useProductData(category);

  let productsList;
  if (filter && categoryProductsFilterBySearch) {
    productsList = categoryProductsFilterBySearch.map((item: any) => (
      <ProductItem key={item.id} product={item} />
    ));
  } else if (productsByCategory) {
    productsList = productsByCategory.map((item) => (
      <ProductItem key={item.id} product={item} />
    ));
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography
        variant="h2"
        fontSize="2rem"
        sx={{
          textTransform: "uppercase",
        }}
      >
        {category}
      </Typography>
      <Search />
      <Box>
        {isLoading ? (
          <Spinner />
        ) : (
          <Box
            sx={{
              display: "grid",
              padding: "1rem",
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
            {productsList?.length > 0
              ? productsList
              : "There are no products with that name available."}
          </Box>
        )}
      </Box>
    </Box>
  );
};

// export default WithProducts(Category);

export default Category;
