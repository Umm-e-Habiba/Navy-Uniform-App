import { Box } from "@mui/material";
import React from "react";
import softPak from "../../assets/dress_one/LeftBiceps/pak-flag-soft.webp";
import { CurrentBoxPosition } from "../../utils/logics";
import { BoxPositions } from "../../utils/utils";

const LeftBicepContent = (props) => {
    const { currentDresses, handleEnter, handleLeave } = props;

    const GetCurrentContent = () => {
        const getCurrentCords = CurrentBoxPosition(
            BoxPositions,
            currentDresses?.boxName || currentDresses?.keyName
        );
        if (currentDresses?.tally === "soft" || currentDresses?.tally === "blackSoft") {
            return (
                <Box
                    className="flex_center"
                    sx={{
                        position: "absolute",
                        top: getCurrentCords?.flag_cord_one,
                        left: getCurrentCords?.flag_cord_two,
                        transform: "rotateX(-1deg) rotateY(55deg)",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            width: "2rem",
                            height: "1rem",
                            marginLeft: "8px",
                        }}
                        onMouseEnter={(e) => handleEnter(e, softPak)}
                        onMouseLeave={(e) => handleLeave(e)}
                    >
                        <img
                            src={softPak}
                            alt="unifrom-logos"
                            title={"Pakistan Flag"}
                            width={"100%"}
                            height={"100%"}
                            style={{ objectFit: "contain" }}
                        />
                    </Box>
                    {/* <Box
                        sx={{
                            width: "2rem",
                            height: "1rem",
                            marginLeft: "8px",
                        }}
                        onMouseEnter={(e) => handleEnter(e, SSGN_Unit_Emblem)}
                        onMouseLeave={(e) => handleLeave(e)}
                    >
                        <img
                            src={SSGN_Unit_Emblem}
                            alt="unifrom-logos"
                            title={"Pakistan Flag"}
                            width={"100%"}
                            height={"100%"}
                            style={{ objectFit: "contain" }}
                        />
                    </Box> */}
                </Box>
            );
        } else {
            return null;
        }
    };
    const content = GetCurrentContent();
    return <>{content}</>;
};

export default LeftBicepContent;
