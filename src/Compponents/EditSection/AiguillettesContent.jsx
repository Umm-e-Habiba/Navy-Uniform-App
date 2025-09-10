import { Box } from "@mui/material";
import React from "react";
import {
    CurrentAiguillettes,
    
    GetCurrentDressChecks,
    UpdatedTitles,
} from "../../utils/logics";
import { LeftChestStars } from "../../utils/utils";

const AiguillettesContent = (props) => {
    const { selectedOptions, currentDresses, handleEnter, handleLeave } = props;

    const GetCurrentContent = () => {
        let DressCheck = GetCurrentDressChecks(currentDresses?.keyName);
        if (
            DressCheck?.dressCode === 0 ||
            DressCheck?.dressCode === 3 ||
            DressCheck?.dressCode === 2 ||
            DressCheck?.dressCode === 7 
        ) {
            let findStar = selectedOptions?.scrafs?.find(
                (starItem) => starItem?.badgeKey === "leftChest11"
            );
            let placedItems = selectedOptions?.aiguillettes;

            const getPosition = CurrentAiguillettes(
                currentDresses?.keyName,
                placedItems,
                findStar,
                DressCheck
            );

            // let getUpdatedTitle = UpdatedTitles(
            //     DressCheck,
            //     currentDresses?.hoverData,
            //     selectedOptions,
            //     "leftChest"
            // );

            return (
                <>
                    <Box
                        className="left_pocket flex_center"
                        sx={{
                            position: "absolute",
                            top: getPosition?.top,
                            left: getPosition?.left,
                            gap: getPosition?.gap,
                        }}
                    >
                        {placedItems?.length > 0 &&
                            placedItems?.map((item, index) => {
                                let findStarItem = LeftChestStars?.find((starItem) => {
                                    if (findStar) {
                                        return starItem?.badgeKey === item?.badgeKey;
                                    }
                                });

                                let getUpdatedTitle = UpdatedTitles(
                                    index,
                                    item,
                                    DressCheck,
                                    currentDresses?.hoverData,
                                    selectedOptions,
                                    "Aiguillettes"
                                );

                                return (
                                    <>
                                        <Box
                                            key={index}
                                            sx={{
                                                position: "relative",
                                                width: findStar ? "0.35rem" : "6.4rem",
                                                height: findStar ? "0.35rem" : "5.4rem",
                                                transform:
                                                    findStarItem?.sizeScale || item?.sizeScale
                                                        ? findStarItem?.sizeScale || item?.sizeScale
                                                        : "unset",
                                            }}
                                            onMouseEnter={(e) =>
                                                handleEnter(
                                                    e,
                                                    findStarItem
                                                        ? findStarItem?.badgeImage
                                                        : item?.badgeImage
                                                )
                                            }
                                            onMouseLeave={(e) => handleLeave(e)}
                                        >
                                            <img
                                                src={
                                                    findStarItem
                                                        ? findStarItem?.badgeImage
                                                        : item?.badgeImage
                                                }
                                                alt="uniform-logos"
                                                title={getUpdatedTitle}
                                                width="100%"
                                                height="100%"
                                                style={{
                                                    objectFit: "contain",
                                                }}
                                            />
                                        </Box>
                                    </>
                                );
                            })}
                    </Box>
                </>
            );
        }
    };

    let Content = GetCurrentContent();

    return <>{Content}</>;
};

export default AiguillettesContent;
