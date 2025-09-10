import { Box } from "@mui/material";
import React from "react";
import {
    CurrentLeftPocket,
    GetCurrentBadge,
    GetCurrentDressChecks,
    leftSortItems,
} from "../../utils/logics";
import { LeftChestStars } from "../../utils/utils";

const MedalsContent = (props) => {
    const { selectedOptions, currentDresses, handleEnter, handleLeave } = props;

    const GetCurrentContent = () => {
        return (
            <>
                {selectedOptions?.Medals?.map((item, index) => {
                    let itemCoordinates = GetCurrentBadge(
                        item?.Coordinates,
                        currentDresses?.keyName
                    );

                    return (
                        <Box
                            onMouseEnter={(e) => handleEnter(e, item?.badgeImage)}
                            onMouseLeave={(e) => handleLeave(e)}
                            key={index}
                            sx={{
                                top: itemCoordinates?.cord_one,
                                left: itemCoordinates?.cord_two,
                                width: currentDresses?.smallMedals ? "0.5rem" : ".7rem",
                                height: currentDresses?.smallMedals ? "1.8rem" : "2.4rem",
                                marginLeft: "-5px",
                                zIndex: 19 - item?.seniority + 1,
                            }}
                        >
                            <img
                                src={item?.badgeImage}
                                alt="uniform-logos"
                                title={currentDresses?.keyName === "femaleFullBlackWinterCeremonialDressAFNS" || currentDresses?.keyName === "femaleFullBlackWinterCeremonialDress"  || currentDresses?.keyName === "FullBlackWinterCeremonialDress"
                                    ? `${item?.name} aligned with left lapel point.`
                                    : `${item?.name} is 5.5cm above the top line of left pocket`
                                }
                                width="100%"
                                height="100%"
                                style={{
                                    objectFit: "contain",
                                }}
                            />
                        </Box>
                    );
                })}
            </>
        );
    };

    let Content = GetCurrentContent();

    return <>{Content}</>;
};

export default MedalsContent;
