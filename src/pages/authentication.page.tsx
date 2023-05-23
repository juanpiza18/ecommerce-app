import { Box } from "@mui/material";
import React from "react";
import SignIn from "../components/authentication/signin.component";
import SignUp from "../components/authentication/signup.component";
import BaseLayout from "../layout/BaseLayout";

const AuthenticationPage = () => {
  return (
    <BaseLayout>
      <Box
        sx={{
          display: "flex",
          width: "900px",
          justifyContent: "space-between",
          margin: "30px auto",
        }}
      >
        <SignIn />
        <SignUp />
      </Box>
    </BaseLayout>
  );
};

export default AuthenticationPage;
