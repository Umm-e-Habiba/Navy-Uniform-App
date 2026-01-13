import { Box } from "@mui/material";
import { current } from "@reduxjs/toolkit";
import React from "react";

const ShowExtraImage = (props) => {
    const { badgeData, handleEnter, handleLeave, size, title, currentDresses } = props;

    // Dresses with larger third insignia width (2rem)
    const largeWidthDresses = ["femaleInformalMessDressRedSeaRig","female_four","femaleWorkingDress3AWinter","femaleWorkingDressWhiteSummerOptional","femaleWorkingDressWhiteSummer","male2A","male2B","camoPakMarinesCombat","camoPakMarinesWorking_eight","camoPakMarines_six","camoSSGNCombat","camoSSGNWorking_nine","camoSSGN_seven","WorkingWinterBlackModified","InformalMessDressRedSeaRig","MessDressWhiteWinterMessKit","FullWhiteSummerCeremonial", "male2B","WorkingDressWhite","WorkingDressWhiteWinter","maleFour"];
    const isLargeWidth = largeWidthDresses.includes(currentDresses?.keyName);

    // Dresses with larger height and adjusted left position (for camouflage/combat dresses)
    const largeHeightDresses = [""];
    const isLargeHeight = largeHeightDresses.includes(currentDresses?.keyName);

    let BadgeCords = badgeData?.Coordinates?.find(
        (item) => currentDresses?.keyName === item?.keyName
    );
    return (
        <Box
            sx={{
                position: badgeData?.badgePosition ? badgeData?.badgePosition : "unset",
                top: BadgeCords?.cord_one 
                    ? (isLargeHeight ? `calc(${BadgeCords?.cord_one} - 0.5rem)` : (isLargeWidth ? `calc(${BadgeCords?.cord_one} - 0.2rem)` : BadgeCords?.cord_one))
                    : "unset",
                left: BadgeCords?.cord_two 
                    ? (isLargeHeight ? `calc(${BadgeCords?.cord_two} + 0.3rem)` : BadgeCords?.cord_two)
                    : "unset",
                display: "flex",
                justifyContent: "center",
                alignItems: "end",
                width: badgeData?.id === 5 
                    ? ".2rem" 
                    : (isLargeWidth ? "2rem" : "2rem"),
                height: isLargeHeight ? "1.2rem" : (isLargeWidth ? "0.9rem" : ".9rem"),
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
