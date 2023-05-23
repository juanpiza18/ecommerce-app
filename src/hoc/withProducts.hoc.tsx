import React, { useEffect } from "react";
import { useProductActions } from "../hooks/useProductData.hook";

const WithProducts = (WrappedComponent: React.ComponentType) =>
  function Products({ ...props }) {
    const productActions = useProductActions();
    useEffect(() => {
      productActions.getProducts();
    }, [productActions]);
    return <WrappedComponent {...props} />;
  };

export default WithProducts;
