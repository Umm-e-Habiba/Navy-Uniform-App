import { Box } from "@mui/material";
import React from "react";
import star from "../../assets/dress_one/LeftChest/Miniature Star 23.png";
import beltLogo from "../../assets/dress_one/LeftChest/beltLogo.png";
import { beltStarCords } from "../../utils/utils";

const BeltStars = (props) => {
    let { currentDresses, selectedOptions, handleEnter, handleLeave } = props;
    let content;
    if (selectedOptions?.rank?.[0]?.beltStar) {
        content = Array.from({ length: selectedOptions?.rank?.[0]?.beltStar }).map((_, index) => {
            let cordItem = beltStarCords?.[selectedOptions?.rank?.[0]?.beltStar - 1];
            console.log("cordItem", cordItem);
            return (
                <Box
                    onMouseEnter={(e) => handleEnter(e, star)}
                    onMouseLeave={(e) => handleLeave(e)}
                    src={star}
                    component={"img"}
                    sx={{
                        width: ".2rem",
                        objectFit: "contain",
                        position: "relative",
                        top: cordItem?.Coordinates?.[index]?.cord_one,
                        left: cordItem?.Coordinates?.[index]?.cord_two,
                    }}
                ></Box>
            );
        });
    } else {
        content = null;
    }

    return (
        <Box
            sx={{
                position: "absolute",
                top: "22.7rem",
                left: "8rem",
                display: "flex",
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column" }}>{content}</Box>
            <Box
                onMouseEnter={(e) => handleEnter(e, beltLogo)}
                onMouseLeave={(e) => handleLeave(e)}
                src={beltLogo}
                component={"img"}
                sx={{
                    width: ".53rem",
                    objectFit: "contain",
                    position: "relative",
                    top: "1.5px",
                    left: content ? "26px" : "25px",
                }}
            ></Box>
        </Box>
    );
};

export default BeltStars;
