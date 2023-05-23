import React from "react";
import { Box, ButtonBase, styled, Typography } from "@mui/material";
import Jackects from "../../assets/home_jackets_1.jpg";
import Hats from "../../assets/home_hats_1.jpg";
import Sneakers from "../../assets/home_sneakers_1.jpg";
import Pants from "../../assets/home_pants_1.jpg";
import Shirst from "../../assets/home_shirts_1.jpg";
import Sports from "../../assets/home_sports_1.jpg";
import Women from "../../assets/home_women_1.jpg";
import Men from "../../assets/home_men_1.jpg";
import { Link } from "react-router-dom";

const images = [
  {
    src: Jackects,
    title: "Jackets",
  },
  {
    src: Hats,
    title: "Hats",
  },
  {
    src: Sneakers,
    title: "Sneakers",
  },
  {
    src: Pants,
    title: "Pants",
  },
  {
    src: Shirst,
    title: "Shirts",
  },
  {
    src: Sports,
    title: "Sports",
  },
  {
    src: Women,
    title: "Women",
  },
  {
    src: Men,
    title: "Men",
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: "250px",
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid white",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
  textTransform: "uppercase",
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

const ButtonBases = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          sm: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
        },
        gap: 2,
        padding: {
          xs: "0.8rem",
          sm: "0.8rem",
          md: "1.6rem",
          lg: "2.4rem",
          xl: "3.2rem",
        },
      }}
    >
      {images.map((image) => (
        <ImageButton focusRipple key={image.title}>
          <Link to={`shop/${image.title.toLowerCase()}`}>
            <ImageSrc style={{ backgroundImage: `url(${image.src})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={() => ({
                  position: "relative",
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                })}
              >
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </Link>
        </ImageButton>
      ))}
    </Box>
  );
};

export default ButtonBases;
