import { Box } from "@mui/material";
import { current } from "@reduxjs/toolkit";
import React from "react";

const ShowExtraImage = (props) => {
    const { badgeData, handleEnter, handleLeave, size, title, currentDresses } = props;

    let BadgeCords = badgeData?.Coordinates?.find(
        (item) => currentDresses?.keyName === item?.keyName
    );
    return (
        <Box
            sx={{
                position: badgeData?.badgePosition ? badgeData?.badgePosition : "unset",
                top: BadgeCords?.cord_one ? BadgeCords?.cord_one : "unset",
                left: BadgeCords?.cord_two ? BadgeCords?.cord_two : "unset",
                display: "flex",
                justifyContent: "center",
                alignItems: "end",
                width: badgeData?.id === 5 ? ".65rem" : "1rem",
                height: ".7rem",
                transform:
                    badgeData?.sizeScale || badgeData?.leftChest_Scale
                        ? badgeData?.sizeScale || badgeData?.leftChest_Scale
                        : "unset",
            }}
            onMouseEnter={(e) => handleEnter(e, badgeData?.badgeImage)}
            onMouseLeave={(e) => handleLeave(e)}
        >
            <img
                src={badgeData?.badgeImage}
                alt="unifrom-logos"
                title={title ? title : ""}
                width={"100%"}
                height={"100%"}
                style={{ objectFit: "contain" }}
            />
        </Box>
    );
};

export default ShowExtraImage;
