import React from "react";
import { GetCurrentBadge } from "../../utils/logics";
import { Box } from "@mui/material";

const NeckMedals = (props) => {
    const { selectedOptions, currentDresses, handleEnter, handleLeave } = props;

    const GetCurrentContent = () => {
        return (
            <>
                {selectedOptions?.neckMedals?.map((item, index) => {
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
                                display: "flex",
                                // top: itemCoordinates?.cord_one,
                                // left: itemCoordinates?.cord_two,
                                width: item?.width ? item?.width : "1.5rem",
                                // width: currentDresses?.smallMedals ? "0.5rem" : ".7rem",
                                // height: currentDresses?.smallMedals ? "1.8rem" : "2.4rem",
                                marginLeft: "-5px",
                                zIndex: 19 - item?.seniority + 1,
                            }}
                        >
                            <img
                                src={item?.badgeImage}
                                alt="uniform-logos"
                                title={`${item?.name} is below neck collars`}
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

export default NeckMedals;
