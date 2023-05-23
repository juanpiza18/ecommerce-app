import React, { useCallback, useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home.page";
import ShopPage from "./pages/shop.page";
import { defaultTheme } from "./styles/themes/default.theme";
import AuthenticationPage from "./pages/authentication.page";
import { useUserActions, useUserData } from "./hooks/useUserData.hook";
import CheckoutPage from "./pages/checkout.page";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomePage />,
//     id: "root",
//   },
//   {
//     path: "shop/*",
//     element: <BaseLayoutOutlet />,
//     children: [
//       {
//         index: true,
//         element: <ShopPage />,
//       },
//       {
//         path: ":category",
//         element: <Category />,
//       },
//     ], <RouterProvider router={router} />
//   },
// ]);

const App = () => {
  const { currentUser } = useUserData();
  const { checkUser } = useUserActions();

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="shop/*" element={<ShopPage />} />
          <Route
            path="auth"
            element={
              currentUser ? <Navigate replace to="/" /> : <AuthenticationPage />
            }
          />
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
