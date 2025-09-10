import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const DrawerUnformModel = (props) => {
    const { data, handleLeaveModel, handleDressClick } = props;
    // const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "0.7rem",
                width: "100%",
                maxWidth: "16rem",
            }}
        >
            <Box
                className="flex_center"
                onClick={(e) => handleDressClick(e, data)}
                sx={{
                    padding: "1rem 0",
                    borderRadius: "1rem",
                    border: "1px solid white",
                    cursor: "pointer",
                    background: "#e6e6e6",
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: { sm: "13rem", lg: "14rem" },
                    }}
                >
                    <Box
                        component="img"
                        src={data?.dressImg}
                        alt="drawer_uniform_image"
                        loading="lazy"
                        sx={{
                            width: "100%",
                            height: "auto",
                            maxWidth: "14rem",
                            maxHeight: "15rem",
                            objectFit: "contain",
                        }}
                    />
                </Box>
            </Box>
            <Box width={"100%"} className="flex_center">
                <Typography
                    variant="h6"
                    color="#ffffff"
                    textAlign={"center"}
                    fontSize="13px"
                    padding={"0 0.5rem"}
                >
                    {data?.dressName}
                </Typography>
            </Box>
        </Box>
    );
};

export default DrawerUnformModel;
