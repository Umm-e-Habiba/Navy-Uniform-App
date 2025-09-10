import { Box } from "@mui/material";
import React from "react";
import {
    CurrentLeftPocket,
    GetCurrentBadge,
    GetCurrentDressChecks,
    leftSortItems,
    UpdatedTitles,
} from "../../utils/logics";
import { LeftChestStars } from "../../utils/utils";

const LeftChestContent = (props) => {
    const { selectedOptions, currentDresses, handleEnter, handleLeave } = props;

    const GetCurrentContent = () => {
        let DressCheck = GetCurrentDressChecks(currentDresses?.keyName);
        if (
            DressCheck?.dressCode === 1 ||
            DressCheck?.dressCode === 3 ||
            DressCheck?.dressCode === 4
        ) {
            let findStar = selectedOptions?.leftChest?.find(
                (starItem) => starItem?.badgeKey === "leftChest11"
            );
            let placedItems = leftSortItems(DressCheck?.dressCode, selectedOptions?.leftChest);

            const getPosition = CurrentLeftPocket(
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
                                    "leftChest"
                                );

                                return (
                                    <>
                                        <Box
                                            key={index}
                                            sx={{
                                                position: "relative",
                                                width: findStar ? "0.35rem" : ".4rem",
                                                height: findStar ? "0.35rem" : ".4rem",
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

export default LeftChestContent;
