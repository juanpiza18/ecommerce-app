import Category from "../components/category/Category.component";
import React, { useCallback, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ProductsPreview from "../components/productsPreview/ProductsPreview.component";
import BaseLayout from "../layout/BaseLayout";
import { useProductActions } from "../hooks/useProductData.hook";
import Product from "../components/product/product.component";

const ShopPage = () => {
  const { getProducts } = useProductActions();

  const memoizedGetProducts = useCallback(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    memoizedGetProducts();
  }, [memoizedGetProducts]);

  return (
    <BaseLayout>
      <Routes>
        <Route index element={<ProductsPreview />} />
        <Route path=":category" element={<Category />} />
        <Route path=":category/:productId" element={<Product />} />
      </Routes>
    </BaseLayout>
  );
};

export default ShopPage;
