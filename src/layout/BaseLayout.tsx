import { Box, Typography } from "@mui/material";
import React from "react";
import NavBar from "../components/navBar/NavBar.component";

const createBodyExample = () => (
  <Box height="100%">
    <Typography> BODY </Typography>
  </Box>
);

const BaseLayout = ({ children }: React.PropsWithChildren) => {
  const defaultChildren = children ?? createBodyExample();
  return (
    <Box
      display="flex"
      flexDirection="column"
      position="relative"
      sx={{ height: "100vh" }}
    >
      <NavBar />
      <Box
        sx={{
          marginTop: "100px",
          height: "calc(100% - 64px)",
        }}
      >
        {defaultChildren}
      </Box>
    </Box>
  );
};

export default BaseLayout;
