import React from "react";
import {
    calulateTopOfRibbons,
    GetCurrentBadge,
    GetCurrentDressChecks,
    GetPositionTitles,
    LeftPocketPositions,
    UpdatedTitles,
} from "../../utils/logics";
import { Box } from "@mui/material";
import ShowExtraImage from "./ShowExtraImage";

const LeftPocketContent = (props) => {
    const {
        selectedOptions,
        currentDresses,
        handleEnter,
        handleLeave,
        selectedInsiginas,
        setSelectedInsiginas,
        currentBadgesState,
    } = props;

    // Dress-specific width mapping for left pocket insignia
    // Key: dress keyName, Value: width in rem
    // To add a new dress with custom width, just add: "DressKeyName": "width"
    const dressWidthMap = {
        "FullWhiteSummerCeremonial": "2.4rem",
        "FullBlackWinterCeremonialDress": "1.7rem",
        "ServiceBlackDressWinter": "1.7rem",
        "male2B": "2.4rem",
        "WorkingDressWhite": "2.4rem",
        "WorkingDressWhiteWinter": "2.4rem",
        "maleFour": "2.4rem",
        "MessDressWhiteWinterMessKit": "2.4rem",
        "InformalMessDressRedSeaRig": "2.4rem",
        "WorkingWinterBlackModified": "2.4rem",
        "camoSSGN_seven": "2.4rem",
        "camoSSGNWorking_nine": "2.4rem",
        "camoSSGNCombat": "2.4rem",
        "camoPakMarines_six": "2.4rem",
        "camoPakMarinesWorking_eight": "2.4rem",
        "camoPakMarinesCombat": "2.4rem",
        "male2A": "2.4rem",
        "ServiceDressWhite": "2rem",
        "female_one":"2rem",
        "female_three":"2rem",
        "femaleFive":"2rem",
        "femaleSeven":"2rem",
        "femaleWorkingDressWhiteSummer":"2rem",
        "femaleWorkingDressWhiteSummerOptional":"2rem",
        "femaleWorkingDress3AWinter":"2rem",
        "femaleWorkingDress3AWinterOptional":"2rem",
        "female_four":"2rem",
        "femaleMessDressSummerMessKit":"2rem",
        "femaleInformalMessDressRedSeaRig":"2rem",
        "CeremonialSummerForCPOSANDPOS":"2rem",
        "WorkingDressWhiteSummerCPOsPOs":"2rem",
        "WorkingDressWhiteWinterCPOsPOs":"2rem",
        "DigitalCamouflageCombatCPOsPOs":"2rem",
        "WinterCeremonialCPOsPOs":"2rem",
        "WinterWorkingCPOsPOs":"2rem",
        "SSGNCamouflageCeremonialCPOs":"2rem",
        "SSGNCamouflageCombatCPOs":"2rem",
        "SSGNCamouflageWorkingCPOs":"2rem",
        "PakMarineCeremonialCPOs":"2rem",
        "PakMarineWorkingCPOs":"2rem",
        "PakMarineCombatCPOs":"2rem",
        "CeremonialSummerForPOS":"2rem",
        "WorkingDressWhiteWinterPOs":"2rem",
        "WorkingDressWhiteSummerPOs":"2rem",
        "DigitalCamouflageCombatPOs":"2rem",
        "WinterCeremonialPOs":"2rem",
        "WinterWorkingPOs":"2rem",
        "SSGNCamouflageWorkingPOs":"2rem",
        "SSGNCamouflageCeremonialPOs":"2rem",
        "PakMarineWorkingPOs":"2rem",
        "PakMarineCeremonialPOs":"2rem",
        "PakMarineCombatPOs":"2rem",
        "CeremonialSummerForLDGSAndBelow":"2rem",
        "WorkingDressWhiteSummerLDGSBelow":"2rem",
        "WorkingDressWhiteWinterLDGSBelow":"2rem",
        "DigitalCamouflageCombatLDGSBelow":"2rem",
        "WinterWorkingLDGSBelow":"2rem",
        "SSGNCamouflageCeremonialLDGSBelow":"2rem",
        "SSGNCamouflageWorkingLDGSBelow":"2rem",
        "SSGNCamouflageCombatLDGSBelow":"2rem",
        "PakMarineCeremonialLDGSBelow":"2rem",
        "PakMarineWorkingLDGSBelow":"2rem",
        "PakMarineCombatLDGSBelow":"2rem",
        "femaleDressNo1FullWhiteSummerCeremonials":"2rem",
        "femaleDressNo3WorkingDressWhiteSummer":"2rem",
        "femaleDressNo3AWorkingDressSummer":"2rem",
        "femaleDressNo4DigitalCamouflageCombat":"2rem",
        "femaleDressNo7WinterCeremonial":"2rem",
        "femaleDressNo8WinterWorking":"2rem",
        "POfemaleDressNo1FullWorkingDressWhiteSummer": "2rem",
        "POfemaleDressNo3WorkingDressWhiteSummer": "2rem",
        "POfemaleDressNo3AWorkingDressSummer" : "2rem",
        "POfemaleDressNo4DigitalCamouflageCombat" : "2rem",
        "POfemaleDressNo7WinterCeremonial" : "2rem",
        "POfemaleDressNo8WinterWorking" : "2rem",
        "LDGfemaleDressNo1FullWorkingDressWhiteSummer" : "2rem",
        "LDGfemaleDressNo3WorkingDressWhiteSummer" : "2rem",
        "LDGfemaleDressNo3AWorkingDressSummer" : "2rem",
        "LDGfemaleDressNo4DigitalCamouflageCombat" : "2rem",
        "LDGfemaleDressNo7WinterCeremonial" : "2rem",
        "LDGfemaleDressNo8WinterWorking" : "2rem",
        "female_two" : "2rem",
        "femaleSix" : "2rem",
        "femaleWorkingDress3WorkingSummer" : "2rem",
        "femaleWhiteDress3AWorkingWinter" : "2rem",
        "female_four_AFNS" : "2rem",
        "femaleMessDressSummerMessKitAFNS" : "2rem",
        "femaleInformalMessDressRedSeaRigAFNS" : "2rem",
        "femaleFullBlackWinterCeremonialDressAFNS" : "2rem",
        "femaleServiceDressBlackAFNS" : "2rem",
        "femaleServiceDressBlackWithJerseyAFNS" : "2rem",
        "femaleMessDressBlackWinterMessKitAFNS" : "2rem",
    };

    // Dress-specific left position mapping for left pocket insignia
    // Key: dress keyName, Value: left position in rem
    // To add a new dress with custom left position, just add: "DressKeyName": "12rem"
    const dressLeftMap = {
        "CeremonialSummerForCPOSANDPOS": "12rem",
        "WorkingDressWhiteSummerCPOsPOs":"12rem",
        "WorkingDressWhiteWinterCPOsPOs":"11.5rem",
        "DigitalCamouflageCombatCPOsPOs":"11.3rem",
        "WinterCeremonialCPOsPOs":"11.5rem",
        "WinterWorkingCPOsPOs":"11.5rem",
        "SSGNCamouflageCeremonialCPOs":"11.5rem",
        "SSGNCamouflageCombatCPOs":"11.5rem",
        "SSGNCamouflageWorkingCPOs":"11.5rem",
        "PakMarineCeremonialCPOs":"11.5rem",
        "PakMarineWorkingCPOs":"11.5rem",
        "PakMarineCombatCPOs":"11.5rem",
        "CeremonialSummerForPOS":"11.9rem",
        "WorkingDressWhiteWinterPOs":"11.5rem",
        "WorkingDressWhiteSummerPOs":"11.9rem",
        "WinterCeremonialPOs":"11.5rem",
        "WinterWorkingPOs":"11.5rem",
        "SSGNCamouflageWorkingPOs":"11.4rem",
        "SSGNCamouflageCeremonialPOs":"11.4rem",
        "PakMarineWorkingPOs":"11.4rem",
        "PakMarineCeremonialPOs":"11.4rem",
        "PakMarineCombatPOs":"11.4rem",
        "CeremonialSummerForLDGSAndBelow":"11.9rem",
        "WorkingDressWhiteSummerLDGSBelow":"11.9rem",
        "WorkingDressWhiteWinterLDGSBelow":"11.7rem",
        "DigitalCamouflageCombatLDGSBelow":"11.4rem",
        "WinterWorkingLDGSBelow":"11.7rem",
        "SSGNCamouflageCeremonialLDGSBelow":"11.5rem",
        "SSGNCamouflageWorkingLDGSBelow":"11.5rem",
        "SSGNCamouflageCombatLDGSBelow":"11.5rem",
        "PakMarineCeremonialLDGSBelow":"11.5rem",
        "PakMarineWorkingLDGSBelow":"11.5rem",
        "PakMarineCombatLDGSBelow":"11.5rem",
        "femaleDressNo1FullWhiteSummerCeremonials":"11.7rem",
        "femaleDressNo3WorkingDressWhiteSummer":"11.7rem",
        "femaleDressNo3AWorkingDressSummer":"12.1rem",
        "femaleDressNo4DigitalCamouflageCombat":"11.4rem",
        "femaleDressNo7WinterCeremonial":"11.9rem",
        "femaleDressNo8WinterWorking":"11.9rem",
        "POfemaleDressNo1FullWorkingDressWhiteSummer":"11.7rem",
        "POfemaleDressNo3WorkingDressWhiteSummer":"11.7rem",
        "POfemaleDressNo3AWorkingDressSummer":"12.1rem",
        "POfemaleDressNo4DigitalCamouflageCombat":"11.4rem",
        "POfemaleDressNo7WinterCeremonial":"11.9rem",
        "POfemaleDressNo8WinterWorking":"11.9rem",
        "LDGfemaleDressNo1FullWorkingDressWhiteSummer":"11.7rem",
        "LDGfemaleDressNo3WorkingDressWhiteSummer":"11.7rem",
        "LDGfemaleDressNo3AWorkingDressSummer":"12.1rem",
        "LDGfemaleDressNo4DigitalCamouflageCombat":"11.4rem",
        "LDGfemaleDressNo7WinterCeremonial":"11.9rem",
        "LDGfemaleDressNo8WinterWorking":"11.9rem",
        "female_two":"11.9rem",
        "femaleSix":"11.9rem",
        "femaleWorkingDress3WorkingSummer":"11.9rem",
        "femaleWhiteDress3AWorkingWinter":"11.4rem",
        "female_four_AFNS":"11.9rem",
        "femaleMessDressSummerMessKitAFNS":"11.9rem",
        "femaleInformalMessDressRedSeaRigAFNS":"11.9rem",
        "femaleFullBlackWinterCeremonialDressAFNS":"13rem",
        "femaleServiceDressBlackAFNS":"12.5rem",
        "femaleServiceDressBlackWithJerseyAFNS":"11.4rem",
        "femaleMessDressBlackWinterMessKitAFNS":"11.9rem",
    };

    // Get the width for the current dress, default to 1.3rem if not in map
    const leftPocketWidth = dressWidthMap[currentDresses?.keyName] || "1.3rem";
    
    // Get the left position for the current dress (if specified)
    const customLeftPosition = dressLeftMap[currentDresses?.keyName];
    
    // Check if current dress has custom (non-default) width - used for position adjustments
    const hasCustomWidth = dressWidthMap.hasOwnProperty(currentDresses?.keyName);

    // Dresses with larger left pocket insignia height (1.2rem) - for camouflage/combat dresses
    const largeHeightDresses = ["female_four_AFNS","LDGfemaleDressNo4DigitalCamouflageCombat","POfemaleDressNo4DigitalCamouflageCombat","femaleDressNo4DigitalCamouflageCombat","SSGNCamouflageCombatLDGSBelow","SSGNCamouflageWorkingLDGSBelow","SSGNCamouflageCeremonialLDGSBelow","PakMarineCombatLDGSBelow","PakMarineWorkingLDGSBelow","PakMarineCeremonialLDGSBelow","DigitalCamouflageCombatLDGSBelow","WorkingDressWhiteWinterLDGSBelow","WorkingDressWhiteSummerLDGSBelow","CeremonialSummerForLDGSAndBelow","PakMarineCombatPOs","PakMarineCeremonialPOs","PakMarineWorkingPOs","maleFour","female_four","DigitalCamouflageCombatCPOsPOs","DigitalCamouflageCombatPOs"];
    const isLargeHeight = largeHeightDresses.includes(currentDresses?.keyName);

    // DEBUG: Log current dress and width values
    console.log("=== LEFT POCKET DEBUG ===");
    console.log("Current Dress Name:", currentDresses?.keyName);
    console.log("leftPocketWidth:", leftPocketWidth);
    console.log("hasCustomWidth:", hasCustomWidth);
    console.log("isLargeHeight:", isLargeHeight);
    console.log("========================");

    const GetCurrentContent = () => {
        let DressCheck = GetCurrentDressChecks(currentDresses?.keyName);
        let GetBoxCords = LeftPocketPositions(
            currentDresses?.keyName,
            DressCheck,
            selectedOptions,
            currentBadgesState
        );

        if (
            DressCheck?.dressCode === 1 ||
            DressCheck?.dressCode === 2 ||
            DressCheck?.dressCode === 3 ||
            DressCheck?.dressCode === 4 ||
            DressCheck?.dressCode === 5
        ) {
            let count = 0;
            let itemtitle;
            if (selectedOptions?.leftPocketInsignia?.length > 0) {
                itemtitle = `${selectedOptions?.rightChest?.[0]?.name} is 1cm above from below ${selectedOptions?.leftPocketInsignia?.[0]?.name}}`;
            } else {
                if (currentBadgesState?.ribbon?.length > 0) {
                    itemtitle = `${selectedOptions?.rightChest?.[0]?.name} is 1cm above the top row of ribbons`;
                } else {
                    itemtitle = `${selectedOptions?.rightChest?.[0]?.name} is 1cm above medals`;
                }
            }

            return (
                <Box
                    className="flex_center"
                    sx={{
                        position: "absolute",
                        top: GetBoxCords?.cord_one 
                            ? (isLargeHeight ? `calc(${GetBoxCords?.cord_one} - 0.7rem)` : GetBoxCords?.cord_one)
                            : "9.3rem",
                        left: customLeftPosition 
                            ? customLeftPosition 
                            : (GetBoxCords?.cord_two 
                                ? (hasCustomWidth ? `calc(${GetBoxCords?.cord_two} - 0.6rem)` : GetBoxCords?.cord_two)
                                : "11.9rem"),
                        flexDirection: "column",
                        gap: "1px",
                    }}
                >
                    {(DressCheck?.dressCode === 2 || DressCheck?.dressCode === 3) &&
                        ((selectedOptions?.leftPocketInsignia?.length === 1 &&
                            selectedOptions?.rightChest?.length > 0) ||
                            (selectedOptions?.leftPocketInsignia?.length < 2 &&
                                selectedOptions?.rightChest?.length > 2)) && (
                            <ShowExtraImage
                                badgeData={selectedOptions?.rightChest?.[0]}
                                handleLeave={handleLeave}
                                handleEnter={handleEnter}
                                title={itemtitle}
                            />
                        )}
                    {DressCheck?.dressCode === 4 &&
                        selectedOptions?.leftPocketInsignia?.length < 2 &&
                        selectedOptions?.rightChest?.length > 2 && (
                            <ShowExtraImage
                                badgeData={selectedOptions?.rightChest?.[0]}
                                handleLeave={handleLeave}
                                handleEnter={handleEnter}
                                title={itemtitle}
                            />
                        )}
                    {/* {(DressCheck?.dressCode === 2 || DressCheck?.dressCode === 3) &&
                        selectedOptions?.leftPocketInsignia?.length < 2 &&
                        selectedOptions?.rightChest?.length > 2 && (
                            <ShowExtraImage
                                badgeData={selectedOptions?.rightChest?.[0]}
                                handleLeave={handleLeave}
                                handleEnter={handleEnter}
                                title={`${selectedOptions?.rightChest?.[0]?.name} is 1cm above from below ${selectedOptions?.leftPocketInsignia?.[0]?.name}}`}
                            />
                        )} */}
                    {selectedOptions?.leftPocketInsignia?.map((item, index) => {
                        if (count < 2) {
                            count += 1;
                            let getUpdatedTitle = UpdatedTitles(
                                index,
                                item,
                                DressCheck,
                                currentDresses?.hoverData,
                                selectedOptions,
                                "leftPocket"
                            );
                            return (
                                <Box
                                    key={item?.id}
                                    sx={{
                                        height: isLargeHeight ? "1.2rem" : ".8rem",
                                        width: leftPocketWidth,
                                        display: "flex",
                                    }}
                                    onMouseEnter={(e) => handleEnter(e, item?.badgeImage)}
                                    onMouseLeave={(e) => handleLeave(e)}
                                >
                                    <img
                                        src={item?.badgeImage}
                                        alt="unifrom-logos"
                                        title={getUpdatedTitle}
                                        width={"100%"}
                                        height={"100%"}
                                        style={{
                                            objectFit: "contain",
                                            rotate: item?.imageRotate ? item?.imageRotate : "none",
                                        }}
                                    />
                                </Box>
                            );
                        }
                    })}
                </Box>
            );
        } else {
            return selectedOptions?.leftPocketInsignia?.map((item, index) => {
                let itemCoordinates = GetCurrentBadge(item?.Coordinates, currentDresses?.keyName);
                // let getTitle = GetPositionTitles(
                //     selectedOptions,
                //     index,
                //     item,
                //     selectedInsiginas,
                //     currentBadgesState
                // );
                let updatedCord = calulateTopOfRibbons(
                    selectedOptions?.ribbon?.length,
                    itemCoordinates,
                    currentBadgesState?.ribbon?.length
                );
                let getUpdatedTitle = UpdatedTitles(
                    index,
                    item,
                    DressCheck,
                    currentDresses?.hoverData,
                    selectedOptions,
                    "leftPocket"
                );
                return (
                    <Box
                        onMouseEnter={(e) => handleEnter(e, item?.badgeImage)}
                        onMouseLeave={(e) => handleLeave(e)}
                        sx={{
                            position: "absolute",
                            top: updatedCord ? updatedCord : itemCoordinates?.cord_one,
                            left: customLeftPosition ? customLeftPosition : itemCoordinates?.cord_two,
                            width: item?.id === 5 
                                ? ".9rem" 
                                : leftPocketWidth,
                            height: isLargeHeight ? "1.2rem" : "auto",
                        }}
                    >
                        <img
                            src={item?.badgeImage}
                            alt="unifrom-logos"
                            title={getUpdatedTitle}
                            width={"100%"}
                            height={"100%"}
                            style={{
                                objectFit: "contain",
                                rotate: item?.imageRotate ? item?.imageRotate : "none",
                            }}
                        />
                    </Box>
                );
            });
        }
    };

    let content = GetCurrentContent();
    return <>{content}</>;
};

export default LeftPocketContent;
