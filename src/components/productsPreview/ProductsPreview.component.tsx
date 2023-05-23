import { Box } from "@mui/system";
import React from "react";
// import WithProducts from "../../hoc/withProducts.hoc";
import { useProductData } from "../../hooks/useProductData.hook";
import ProductSection from "../productSection/ProductSection.component";
import Spinner from "../spinner/Spinner.component";

const ProductsPreview = () => {
  const { isLoading, productCategories } = useProductData();
  return (
    <Box
      sx={{
        padding: "1rem",
      }}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(productCategories).map((title) => {
          const items = productCategories[title];
          return <ProductSection key={title} title={title} products={items} />;
        })
      )}
    </Box>
  );
};

// export default WithProducts(ProductsPreview);

export default ProductsPreview;
