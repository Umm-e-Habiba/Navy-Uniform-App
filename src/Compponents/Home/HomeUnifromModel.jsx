import { Box } from "@mui/material";
import React from "react";
import { CustomButton } from "../../muiStyles";
import { useNavigate } from "react-router-dom";

const HomeUnifromModel = (props) => {
    const { item, handleDressClick } = props;

    return (
        <Box
            // onClick={()=>}
            sx={{
                padding: "1rem",
                borderRadius: "1rem",
                border: "2px solid black",
                position: "relative",
                cursor: "pointer",
                "&:hover .overlay": {
                    width: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    opacity: "1",
                },
                "&:hover .overlay_btn": {
                    backgroundColor: "white",
                },
            }}
        >
            <Box
                className="overlay"
                sx={{
                    backgroundColor: "transparent",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    height: "100%",
                    width: "0%",
                    opacity: "0",
                    transition: "all 0.3s ease-in-out",
                }}
            ></Box>
            <CustomButton
                className="flex_center overlay_btn"
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    color: "black",
                    border: "1px solid black",
                    borderRadius: "0.5rem",
                    textAlign: "center",
                    fontSize: "1rem",
                    width: "7rem",
                    zIndex: "9",
                }}
            >
                Edit Uniform
            </CustomButton>
            <Box width={"14rem"} height={"15rem"}>
                <img
                    src={item?.dressImg}
                    alt="drawer_uniform_image"
                    width={"100%"}
                    height={"100%"}
                    style={{ objectFit: "contain" }}
                />
            </Box>
        </Box>
    );
};

export default HomeUnifromModel;
