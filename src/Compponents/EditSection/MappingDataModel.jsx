import { Box } from "@mui/material";
import React from "react";

const MappingDataModel = (props) => {
    const { selectedOptions, currentDresses, handleEnter, handleLeave } = props;
    return (
        <>
            {selectedOptions?.leftPocketInsignia?.map((item) => {
                let itemCoordinates = GetCurrentBadge(item?.Coordinates, currentDresses?.keyName);
                return (
                    <Box
                        onMouseEnter={(e) => handleEnter(e, item?.badgeImage)}
                        onMouseLeave={(e) => handleLeave(e)}
                        sx={{
                            position: "absolute",
                            top: itemCoordinates?.cord_one,
                            left: itemCoordinates?.cord_two,
                            width: item?.id === 5 ? ".9rem" : "1.3rem",
                        }}
                    >
                        <img
                            src={item?.badgeImage}
                            alt="unifrom-logos"
                            title={item?.positionTitle}
                            width={"100%"}
                            height={"100%"}
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

export default MappingDataModel;
