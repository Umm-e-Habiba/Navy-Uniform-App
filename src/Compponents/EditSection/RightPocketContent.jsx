import React from "react";
import {
    GetCurrentBadge,
    GetCurrentDressChecks,
    RightPocketBox,
    rightSortItems,
    UpdatedTitles,
} from "../../utils/logics";
import { Box } from "@mui/material";

const RightPocketContent = (props) => {
    const { selectedOptions, currentDresses, handleEnter, handleLeave } = props;
    
    // Check if current dress is one of the two mess dresses that need miniature insignia
    const isMessDressMiniature = 
        currentDresses?.keyName === "MessDressBlackWinterMessKit" || 
        currentDresses?.keyName === "MessDressWhiteSummerMessKit";
    
    // Check if current dress needs larger height for insignia
    const isLargeHeight = currentDresses?.keyName === "WorkingDressWhite";
    
    let black_background=false;
    if( currentDresses && (currentDresses.keyName=== "DigitalCamouflageCombatCPOsPOs" || 
        currentDresses.keyName === "SSGNCamouflageCeremonialCPOs"  ||
        currentDresses.keyName === "SSGNCamouflageWorkingCPOs"  ||
        currentDresses.keyName === "SSGNCamouflageCombatCPOs"  ||
        currentDresses.keyName === "PakMarineCeremonialCPOs"  ||
        currentDresses.keyName === "PakMarineWorkingCPOs"  ||
        currentDresses.keyName === "PakMarineCombatCPOs"  ||

        currentDresses.keyName=== "DigitalCamouflageCombatPOs" || 
        currentDresses.keyName === "SSGNCamouflageCeremonialPOs"  ||
        currentDresses.keyName === "SSGNCamouflageWorkingPOs"  ||
        currentDresses.keyName === "SSGNCamouflageCombatPOs"  ||
        currentDresses.keyName === "PakMarineCeremonialPOs"  ||
        currentDresses.keyName === "PakMarineWorkingPOs"  ||
        currentDresses.keyName === "PakMarineCombatPOs"  ||

        currentDresses.keyName=== "DigitalCamouflageCombatLDGSBelow" || 
        currentDresses.keyName === "SSGNCamouflageCeremonialLDGSBelow"  ||
        currentDresses.keyName === "SSGNCamouflageWorkingLDGSBelow"  ||
        currentDresses.keyName === "SSGNCamouflageCombatLDGSBelow"  ||
        currentDresses.keyName === "PakMarineCeremonialLDGSBelow"  ||
        currentDresses.keyName === "PakMarineWorkingLDGSBelow"  ||
        currentDresses.keyName === "PakMarineCombatLDGSBelow"  ||

        currentDresses.keyName === "femaleDressNo4DigitalCamouflageCombat"  ||
        currentDresses.keyName === "POfemaleDressNo4DigitalCamouflageCombat"  ||
        currentDresses.keyName === "LDGfemaleDressNo4DigitalCamouflageCombat"  ||

        currentDresses.keyName=== "maleFour" || 
        currentDresses.keyName === "camoPakMarines_six"  ||
        currentDresses.keyName === "camoPakMarinesWorking_eight"  ||
        currentDresses.keyName === "camoPakMarinesCombat"  ||
        currentDresses.keyName === "camoSSGN_seven"  ||
        currentDresses.keyName === "camoSSGNWorking_nine"  ||
        currentDresses.keyName === "camoSSGNCombat"  ||

         currentDresses.keyName === "female_four"  ||
        currentDresses.keyName === "female_four_AFNS")  
    ){
         black_background=true;
    }
    const GetCurrentContent = () => {
        let DressCheck = GetCurrentDressChecks(currentDresses?.keyName);
        let placedItems = rightSortItems(
            DressCheck?.dressCode,
            selectedOptions?.rightPocketInsignia
        );
        let getPosition = RightPocketBox(DressCheck, currentDresses?.keyName, placedItems?.length);
        console.log("placedItems", placedItems);
        if (DressCheck?.dressCode === 3 || DressCheck?.dressCode === 4) {
            return (
                <Box
                    className="right_pocket flex_center"
                    sx={{
                        position: "absolute",
                        top: getPosition?.top,
                        left: getPosition?.left,
                        gap: getPosition?.gap,
                    }}
                >
                    {placedItems?.map((item, index) => {
                        console.log("item", item);
                        let getUpdatedTitle = UpdatedTitles(
                            index,
                            item,
                            DressCheck,
                            currentDresses?.hoverData,
                            selectedOptions,
                            "rightPocket"
                        );
                        return (
                            <Box
                                sx={{
                                    position: "relative",
                                    width: isMessDressMiniature 
                                        ? "0.45rem" 
                                        : (DressCheck?.dressCode === 4 ? "0.5rem" : ".6rem"),
                                    marginTop:"2px",
                                    height: isLargeHeight 
                                        ? "0.9rem" 
                                        : (isMessDressMiniature ? "0.7rem" : ".9rem"),
                                    transform: item?.size ? item?.size : "unset",
                                    backgroundColor: black_background ? "black" : "rgba(0,0,0,0)",
                                }}
                                onMouseEnter={(e) => handleEnter(e, item?.badgeImage)}
                                onMouseLeave={(e) => handleLeave(e)}
                            >
                                <img
                                    src={item?.badgeImage}
                                    alt="unifrom-logos"
                                    title={getUpdatedTitle}
                                    width="100%"
                                    height="100%"
                                    style={{ objectFit: "contain" }}
                                />
                            </Box>
                        );
                    })}
                </Box>
            );
        } else {
            return selectedOptions?.rightPocketInsignia?.map((item, index) => {
                let itemCoordinates = GetCurrentBadge(item?.Coordinates, currentDresses?.keyName);
                let isTwo = selectedOptions?.rightPocketInsignia?.length > 1;
                let getUpdatedTitle = UpdatedTitles(
                    index,
                    item,
                    DressCheck,
                    currentDresses?.hoverData,
                    selectedOptions,
                    "rightPocket"
                );
                
                return (
                    (item?.badgeKey === "rightPocket_cmcn" || item?.badgeKey === "rightPocket_cmc") ? (
                        <Box
                            sx={{
                                position: "absolute",
                                top: itemCoordinates?.cord_one,
                                left: itemCoordinates?.cord_two,
                                marginTop:"2px",
                                width: isMessDressMiniature 
                                    ? "0.4rem" 
                                    : (itemCoordinates?.size ? itemCoordinates?.size : ".5rem"),
                                transform: itemCoordinates?.size ? itemCoordinates?.size : "unset",
                                backgroundColor:
                                    black_background
                                    ? "#373738"
                                    : "rgba(179, 176, 176, 0)",
                            }}
                            onMouseEnter={(e) => handleEnter(e, item?.badgeImage)}
                            onMouseLeave={(e) => handleLeave(e)}
                        >
                            <img
                                src={item?.badgeImage}
                                alt="unifrom-logos"
                                title={getUpdatedTitle}
                                width="100%"
                                height="100%"
                                style={{ objectFit: "contain" }}
                            />
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                position: "absolute",
                                top: itemCoordinates?.cord_one,
                                left: itemCoordinates?.cord_two,
                                marginTop:"2px",
                                width: isMessDressMiniature 
                                    ? "0.7rem" 
                                    : (itemCoordinates?.size ? itemCoordinates?.size : ".9rem"),
                                transform: itemCoordinates?.size ? itemCoordinates?.size : "unset",
                                backgroundColor:
                                    black_background
                                    ? "#373738"
                                    : "rgba(179, 176, 176, 0)",
                            }}
                            onMouseEnter={(e) => handleEnter(e, item?.badgeImage)}
                            onMouseLeave={(e) => handleLeave(e)}
                        >
                            <img
                                src={item?.badgeImage}
                                alt="unifrom-logos"
                                title={getUpdatedTitle}
                                width="100%"
                                height="100%"
                                style={{ objectFit: "contain" }}
                            />
                        </Box>
                    )
                );
            });
        }
    };
    const content = GetCurrentContent();
    return <>{content}</>;
};

export default RightPocketContent;
