import React from "react";
import { Box, keyframes } from "@mui/material";
import loaderImage from "../assets/Loader-Image.png"; // Your loader image

// Horizontal (Y-axis) rotation animation
const horizontalSpin = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
`;

const Loader = () => (
  <Box
    sx={{
      height: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff", // white background
      zIndex: 9999,
      position: "fixed",
      top: 0,
      left: 0,
    }}
  >
    <Box
      component="img"
      src={loaderImage}
      alt="Loading..."
      sx={{
        width: "200px",
        height: "300px",
        animation: `${horizontalSpin} 1.5s linear infinite`,
        transformStyle: "preserve-3d",
      }}
    />
  </Box>
);

export default Loader;
