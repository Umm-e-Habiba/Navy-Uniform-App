import { Box } from "@mui/material";
import React from "react";
import { BoxPositions } from "../../utils/utils";
import { CurrentBoxPosition } from "../../utils/logics";

const RightBicepContent = (props) => {
    const { selectedOptions, currentDresses, handleEnter, handleLeave } = props;

    const GetCurrentContent = () => {
        let CurerntCordinates = CurrentBoxPosition(BoxPositions, currentDresses?.boxName);
        return (
            <Box
                sx={{
                    position: "absolute",
                    top: CurerntCordinates?.cord_one,
                    left: CurerntCordinates?.cord_two,
                    transform: `rotateX(${CurerntCordinates?.rotateX}) rotateY(${CurerntCordinates?.rotateY}) 
                    `,
                }}
            >
                {selectedOptions?.rightBiceps?.map((item, index) => {
                    let itemCoordinates = item?.Coordinates?.find(
                        (cordItem) => cordItem?.keyName === currentDresses?.keyName
                    );

                    return (
                        <Box
                            key={index}
                            sx={{
                                width: "2.5rem",
                                height: "1rem",
                            }}
                            onMouseEnter={(e) => handleEnter(e, item?.badgeImage)}
                            onMouseLeave={handleLeave}
                        >
                            <img
                                src={item?.badgeImage}
                                alt="uniform-logos"
                                title={item?.positionTitle}
                                width={"100%"}
                                height={"100%"}
                                style={{ objectFit: "contain" }}
                            />
                        </Box>
                    );
                })}
            </Box>
        );
    };

    const content = GetCurrentContent();

    return <>{content}</>;
};

export default RightBicepContent;
