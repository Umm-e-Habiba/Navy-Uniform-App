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

    // Check if current dress needs black background for left chest insignia
    let needsBlackBackground = false;
    if( currentDresses.keyName === "DigitalCamouflageCombatCPOsPOs" || 
        currentDresses.keyName === "SSGNCamouflageCeremonialCPOs"  ||
        currentDresses.keyName === "SSGNCamouflageWorkingCPOs"  ||
        currentDresses.keyName === "SSGNCamouflageCombatCPOs"  ||
        currentDresses.keyName === "PakMarineCeremonialCPOs"  ||
        currentDresses.keyName === "PakMarineWorkingCPOs"  ||
        currentDresses.keyName === "PakMarineCombatCPOs"  ||

        currentDresses.keyName === "DigitalCamouflageCombatPOs" || 
        currentDresses.keyName === "SSGNCamouflageCeremonialPOs"  ||
        currentDresses.keyName === "SSGNCamouflageWorkingPOs"  ||
        currentDresses.keyName === "SSGNCamouflageCombatPOs"  ||
        currentDresses.keyName === "PakMarineCeremonialPOs"  ||
        currentDresses.keyName === "PakMarineWorkingPOs"  ||
        currentDresses.keyName === "PakMarineCombatPOs"  ||

        currentDresses.keyName === "DigitalCamouflageCombatLDGSBelow" || 
        currentDresses.keyName === "SSGNCamouflageCeremonialLDGSBelow"  ||
        currentDresses.keyName === "SSGNCamouflageWorkingLDGSBelow"  ||
        currentDresses.keyName === "SSGNCamouflageCombatLDGSBelow"  ||
        currentDresses.keyName === "PakMarineCeremonialLDGSBelow"  ||
        currentDresses.keyName === "PakMarineWorkingLDGSBelow"  ||
        currentDresses.keyName === "PakMarineCombatLDGSBelow"  ||

        currentDresses.keyName === "femaleDressNo4DigitalCamouflageCombat"  ||
        currentDresses.keyName === "POfemaleDressNo4DigitalCamouflageCombat"  ||
        currentDresses.keyName === "LDGfemaleDressNo4DigitalCamouflageCombat"  ||

        currentDresses.keyName === "maleFour" || 
        currentDresses.keyName === "camoPakMarines_six"  ||
        currentDresses.keyName === "camoPakMarinesWorking_eight"  ||
        currentDresses.keyName === "camoPakMarinesCombat"  ||
        currentDresses.keyName === "camoSSGN_seven"  ||
        currentDresses.keyName === "camoSSGNWorking_nine"  ||
        currentDresses.keyName === "camoSSGNCombat"  ||

        currentDresses.keyName === "female_four"  ||
        currentDresses.keyName === "female_four_AFNS"  
    ){
        needsBlackBackground = true;
    }

    const GetCurrentContent = () => {
        let DressCheck = GetCurrentDressChecks(currentDresses?.keyName);
        if (
            DressCheck?.dressCode === 1 ||
            DressCheck?.dressCode === 3 ||
            DressCheck?.dressCode === 4 ||
            DressCheck?.dressCode === 5
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

                                // Append black background message to title if needed
                                if (needsBlackBackground) {
                                    getUpdatedTitle += " Insignias shown on black background to enhance visibility.";
                                }

                                // Check if current item is one of the larger insignias that needs size adjustment
                                const isLargerInsignia = 
                                    item?.name === "Foreign War College Insignia" ||
                                    item?.name === "Foreign NDU Insignia" ||
                                    item?.name === "Army 100 Rifles Insignia" ||
                                    item?.name === "Foreign Navy Seal SSG (N) Insignia";

                                // Check if current item is Army 100 Rifles Insignia that needs custom width
                                const isArmy100RiflesSilver = item?.name === "Army 100 Rifles Insignia";

                                return (
                                    <>
                                        <Box
                                            key={index}
                                            sx={{
                                                position: "relative",
                                                width: findStar 
                                                    ? "0.35rem" 
                                                    : (isArmy100RiflesSilver ? "0.6rem" : ".5rem"),
                                                height: findStar 
                                                    ? "0.35rem" 
                                                    : (isLargerInsignia ? "0.6rem" : ".9rem"),
                                                transform:
                                                    findStarItem?.sizeScale || item?.sizeScale
                                                        ? findStarItem?.sizeScale || item?.sizeScale
                                                        : "unset",
                                                backgroundColor: needsBlackBackground ? "black" : "rgba(0,0,0,0)",
                                                marginTop: isLargerInsignia 
                                                    ? "10px" 
                                                    : (needsBlackBackground ? "4px" : "0px"),
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
                                                    marginBottom: isLargerInsignia ? "6px" : "0px",
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
