import { Female } from "@mui/icons-material";
import { positionTitles } from "./utils";

export const GetCurrentUpdatedData = (data, name) => {
    return data?.filter((item) => {
        let isAvailable = IsBadgeAvailable(item, name);
        return isAvailable;
    });
};

export const SetDisabled = (item, selectedOption) => {
    let inpuDisabled;
    if (item?.id === 1) {
        inpuDisabled = false;
    } else if (item?.id === 2 && selectedOption[1]) {
        inpuDisabled = false;
    } else if (item?.id === 3 && selectedOption[1] && selectedOption[2]) {
        inpuDisabled = false;
    } else {
        inpuDisabled = true;
    }
    return inpuDisabled;
};

export const MoveToFront = (arr, itemToMove) => {
    const filteredArr = arr.filter((item) => item?.id !== itemToMove?.id);
    console.log("chekth data of array", filteredArr);
    console.log("chekth data of array", [itemToMove, ...filteredArr]);
    return [itemToMove, ...filteredArr];
};

export const GetBadgesLength = (currentDresses, item) => {
    if (
        currentDresses?.keyName === "camoPakMarinesWorking_eight" ||
        currentDresses?.keyName === "camoSSGNWorking_nine" ||
        currentDresses?.keyName === "WorkingDressWhite" || 
        currentDresses?.keyName === "WorkingDressWhiteSummerCPOsPOs" ||
        currentDresses?.keyName === "WorkingDressWhiteSummerPOs" ||
        currentDresses?.keyName === "WorkingDressWhiteSummerLDGSBelow" ||
        currentDresses?.keyName === "femaleDressNo3WorkingDressWhiteSummer" ||
        currentDresses?.keyName === "POfemaleDressNo3WorkingDressWhiteSummer" ||
        currentDresses?.keyName === "LDGfemaleDressNo3WorkingDressWhiteSummer" 
    ) {
        return item?.badgeKey === "leftChest16" ? 4 : 3;
    } else {
        return 3;
    }
};

export function getResponsiveLength(width) {
    if (width - 4 < 1135) {
        return 8;
    } else {
        return 9;
    }
}

export const IsBadgeAvailable = (item, uniform) => {
    let splitString = item?.keyName?.split(" ");
    if (splitString?.includes(uniform)) {
        return true;
    } else {
        return false;
    }
};

export const CheckRenderBadge = (name, array) => {
    if (array?.find((item) => item?.keyName === name)) {
        return true;
    } else {
        return false;
    }
};

export const IsMultiRankAllowed = (dressKeyName) => {
    const allowedKeys = [
        // POs - Male
        "WorkingDressWhiteSummerPOs",
        "DigitalCamouflageCombatPOs",
        "WinterCeremonialPOs",
        "WinterWorkingPOs",
        "WorkingDressWhiteWinterPOs",
        "CeremonialSummerForPOS",
        "SSGNCamouflageCeremonialPOs",
        "SSGNCamouflageWorkingPOs",
        "PakMarineWorkingPOs",
        "PakMarineCeremonialPOs",

        // POs - Female
        "POfemaleDressNo1FullWorkingDressWhiteSummer",
        "POfemaleDressNo3WorkingDressWhiteSummer",
        "POfemaleDressNo3AWorkingDressSummer",
        "POfemaleDressNo4DigitalCamouflageCombat",
        "POfemaleDressNo7WinterCeremonial",
        "POfemaleDressNo8WinterWorking",

        // LDGs & Below - Male
        "WorkingDressWhiteSummerLDGSBelow",
        "DigitalCamouflageCombatLDGSBelow",
        "WinterCeremonialLDGSBelow",
        "WinterWorkingLDGSBelow",
        "WorkingDressWhiteWinterLDGSBelow",
        "CeremonialSummerForLDGSAndBelow",
        "SSGNCamouflageCeremonialLDGSBelow",
        "SSGNCamouflageWorkingLDGSBelow",
        "PakMarineCeremonialLDGSBelow",
        "PakMarineWorkingLDGSBelow",

        // LDGs & Below - Female
        "LDGfemaleDressNo1FullWorkingDressWhiteSummer",
        "LDGfemaleDressNo3WorkingDressWhiteSummer",
        "LDGfemaleDressNo3AWorkingDressSummer",
        "LDGfemaleDressNo4DigitalCamouflageCombat",
        "LDGfemaleDressNo7WinterCeremonial",
        "LDGfemaleDressNo8WinterWorking",
    ];

    return allowedKeys.includes(dressKeyName);
};

export const makeDeepCopy = (data) => {
    if (window.structuredClone) {
        return structuredClone(data);
    } else {
        return deepCopy(data);
    }
};

export function deepCopy(obj) {
    let copiedObject = obj;

    if (obj && typeof obj === "object") {
        copiedObject = Array.isArray(obj) ? [] : {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === "object") {
                    copiedObject[key] = deepCopy(obj[key]);
                } else {
                    copiedObject[key] = obj[key];
                }
            }
        }
    }

    return copiedObject;
}

export const LimitString = (str, limit) => {
    if (str?.length > limit) {
        return str.substring(0, limit) + "..";
    } else {
        return str;
    }
};

export const SelectedCap = (item, options) => {
    if (item?.availableCaps?.split(" ")?.includes(options?.cap?.[0]?.badgeKey)) {
        return true;
    } else {
        return false;
    }
};

export const GetPositionTitles = (options, index, item, selectedInsiginas, currentBadgesState) => {
    const leftPocketInsignia = selectedInsiginas?.leftPocketInsignia || [];
    const ribbonExists = currentBadgesState?.ribbon?.length > 0;

    if (options?.leftPocketInsignia?.length === 1 && index === 0) {
        return `${leftPocketInsignia[index] || ""} ${
            ribbonExists ? item?.title_ribbon : item?.title_medal
        }`;
    }

    if (index === 0) {
        return `${leftPocketInsignia[index] || ""} ${item?.title_two || ""} ${
            leftPocketInsignia[index + 1] || ""
        }`;
    }

    if (index === 1) {
        return `${leftPocketInsignia[index] || ""} ${
            ribbonExists ? item?.title_ribbon : item?.title_medal
        }`;
    }

    return "";
};

export const GetRightChestTitles = (options, index, item, selectedInsiginas) => {
    if (options?.leftPocketInsignia?.length === 3) {
        return `${selectedInsiginas?.rightChest[index] || ""} ${item?.title_two} ${
            selectedInsiginas?.leftPocketInsignia[2] || ""
        }`;
    } else if (options?.leftPocketInsignia?.length < 3) {
        if (options?.rightChest?.length === 1) {
            return `${selectedInsiginas?.rightChest[index] || ""} ${item?.title_one}`;
        } else if (options?.rightChest?.length > 1) {
            return index === 0
                ? `${selectedInsiginas?.rightChest[index] || ""} ${item?.title_two} ${
                      selectedInsiginas?.rightChest[index + 1] || ""
                  }`
                : `${selectedInsiginas?.rightChest[index] || ""} ${item?.title_one}`;
        }
    } else {
        return "";
    }
};

export const SetBadgeTitles = (setSelectedInsiginas, item, isTwo) => {
    console.log("Check badge Item ", item);
    setSelectedInsiginas((prev) => {
        const currentItems = prev?.[item?.identity] || [];
        const isExist = currentItems.includes(item?.name);

        if (isTwo) {
            return {
                ...prev,
                [item?.identity]: isExist
                    ? currentItems.filter((i) => i !== item?.name)
                    : [...currentItems, item?.name],
            };
        } else {
            return {
                ...prev,
                [item?.identity]: isExist ? [] : [item?.name],
            };
        }
    });
};
// export const SetRightChestBadgeTitles = (setSelectedInsiginas, item, length) => {
//     setSelectedInsiginas((prev) => {
//         const currentItems = prev?.[item?.identity] || [];
//         const isExist = currentItems.includes(item?.name);

//         if (length > 0) {
//             return {
//                 ...prev,
//                 [item?.identity]: isExist
//                     ? currentItems.filter((i) => i !== item?.name)
//                     : [...currentItems, item?.name],
//             };
//         } else {
//             return {
//                 ...prev,
//                 [item?.identity]: isExist ? [] : [item?.name],
//             };
//         }
//     });
// };

export const GetCurrentBadge = (Coordinates, dressKeyName) => {
    return Coordinates?.find((cordItem) => cordItem?.keyName === dressKeyName);
};
export const GetCurrentCaps = (item, dressKeyName) => {
    return item?.keyName?.split(" ")?.includes(dressKeyName);
};

export const Badge = ({ badgeImage, positionTitle, order }) => {
    return (
        <div className="badge_item" style={{ order }}>
            <img
                src={badgeImage}
                alt={positionTitle}
                width="100%"
                height="100%"
                style={{ objectFit: "contain" }}
            />
        </div>
    );
};

export const BadgeRenderCheck = (array, name) => {
    if (array?.includes(name)) {
        return true;
    } else {
        return false;
    }
};

export const GetCurrentRibbon = (name, ribbons) => {
    return ribbons?.find((item) => item?.keyName === name);
};

export const GetItemCords = (array, length) => {
    return array?.find((item) => item?.datalength === length);
};

const GetTop = (selectedOptions, currentDresses) => {
    if (currentDresses?.dressGender === "female") {
        if (selectedOptions?.rightChest === "") {
            return "11rem";
        } else {
            return "9.89rem";
        }
    } else if (currentDresses?.dressGender === "male") {
        if (selectedOptions?.rightChest === "") {
            return "10.18rem";
        } else {
            return "8.99rem";
        }
    }
};

export const IsShowPET = (arr) => {
    return arr?.find((item) => item?.badgeKey === "leftChest16");
};

export const leftSortItems = (code, items) => {
    if (code === 1 || code === 3 || code === 4) {
        let updatedItems = items?.filter((filteerd) => filteerd?.badgeKey !== "leftChest16");
        items?.filter((filteerd) => filteerd?.badgeKey !== "leftChest16");
        console.log("Updated Items check", updatedItems);
        if (updatedItems?.length > 0) {
            if (updatedItems.length === 1) return updatedItems; // Single item remains centered
            if (updatedItems.length === 2) return [updatedItems[1], updatedItems[0]]; // Left and right (2 items)

            // For 3 items: place center, left, and right
            return [updatedItems[2], updatedItems[0], updatedItems[1]];
            // Center, left, right order
        }
    } else {
        return [];
    }
};
export const rightSortItems = (code, items) => {
    if (code === 3 || code === 4) {
        let updatedItems = items?.filter((filtered) => {
            const hasBadge = items?.some(
                (item) =>
                    item?.badgeKey === "rightPocket6" ||
                    item?.badgeKey === "rightPocket7" ||
                    item?.badgeKey === "rightPocket1" ||
                    item?.badgeKey === "rightPocket_cmc" ||
                    item?.badgeKey === "rightPocket_cmcn"
                    
            );
            if (hasBadge) {
                if(items[0]?.badgeKey === "rightPocket_cmc" || items[1]?.badgeKey === "rightPocket_cmc" || items[2]?.badgeKey === "rightPocket_cmc"  ) return (filtered?.badgeKey === "rightPocket_cmc");
                else if(items[0]?.badgeKey === "rightPocket_cmcn" || items[1]?.badgeKey === "rightPocket_cmcn" || items[2]?.badgeKey === "rightPocket_cmcn"  ) return (filtered?.badgeKey === "rightPocket_cmcn");
                else{
                    return (
                    filtered?.badgeKey === "rightPocket6" ||
                    filtered?.badgeKey === "rightPocket7" ||
                    filtered?.badgeKey === "rightPocket1"  
                    );
                }
                
                
            }
            return (
                filtered?.badgeKey !== "rightPocket6" &&
                filtered?.badgeKey !== "rightPocket7" &&
                filtered?.badgeKey !== "rightPocket1" &&
                filtered?.badgeKey !== "rightPocket_cmc" &&
                filtered?.badgeKey !== "rightPocket_cmcn"
            );
        });

        if (updatedItems?.length > 0) {
            if (updatedItems.length === 1) return updatedItems; // Single item remains centered
            if (updatedItems.length === 2) return [updatedItems[1], updatedItems[0]]; // Left and right (2 items) 
            return [updatedItems[2], updatedItems[0], updatedItems[1]];
        }
    } else {
        return [];
    }
};

export const CurrentLeftPocket = (name, array, star, DressCheck) => {
    if (DressCheck?.dressCode === 1) {
        if (array?.length === 1) {
            return {
                top: "1.5rem",
                left: star ? "0.8rem" : "0.75rem",
                gap: "0rem",
            };
        } else if (array?.length === 2) {
            return {
                top: star ? "0.57rem" : "1.6rem",
                left: "0rem",
                gap: "1.2rem",
            };
        } else if (array?.length === 3) {
            return {
                top: "0.5rem",
                left: "-0.15rem",
                gap: "0.5rem",
            };
        }
    } else if (DressCheck?.dressCode === 3) {
        if(name === "SSGNCamouflageWorkingCPOs" || name === "SSGNCamouflageWorkingPOs" || name === "SSGNCamouflageWorkingLDGSBelow"){
            if (array?.length === 1) {
                return {
                    top: "0.6rem",
                    left: "1.1rem",
                    gap: "0rem",
                };
            } else if (array?.length === 2) {
                return {
                    top: star ? "0.5rem" : "0.6rem",
                    left: "0.15rem",
                    gap: "1.4rem",
                };
            } else if (array?.length === 3) {
                return {
                    top: "0.6rem",
                    left: "0.05rem",
                    gap: "0.6rem",
                };
            }
        }
        if (array?.length === 1) {
            return {
                top: "0.6rem",
                left: "0.9rem",
                gap: "0rem",
            };
        } else if (array?.length === 2) {
            return {
                top: star ? "0.5rem" : "0.6rem",
                left: "0.15rem",
                gap: "1.4rem",
            };
        } else if (array?.length === 3) {
            return {
                top: "0.6rem",
                left: "0.05rem",
                gap: "0.6rem",
            };
        }
    } else if (DressCheck?.dressCode === 4) {
        if (name === "WorkingDressWhite" || name === "InformalMessDressRedSeaRig") {
            if (array?.length === 1) {
                return {
                    top: star ? "-0.13rem" : "0.9rem",
                    left: "1.3rem",
                    gap: "0rem",
                };
            } else if (array?.length === 2) {
                return {
                    top: star ? "-0.11rem" : "0.9rem",
                    left: "0.5rem",
                    gap: "1.3rem",
                };
            } else if (array?.length === 3) {
                return {
                    top: "0.9rem",
                    left: "0.35rem",
                    gap: "0.55rem",
                };
            }
        } else if (name === "WorkingDressWhiteWinter" || name === "WorkingWinterBlackModified") {
            if (array?.length === 1) {
                return {
                    top: star ? "0.65rem" : "1.6rem",
                    left: "0.89rem",
                    gap: "0rem",
                };
            } else if (array?.length === 2) {
                return {
                    top: "1.6rem",
                    left: "0.1rem",
                    gap: "1.3rem",
                };
            } else if (array?.length === 3) {
                return {
                    top: "1.6rem",
                    left: "0.05rem",
                    gap: "0.45rem",
                };
            }
        } else if (name === "femaleWorkingDressWhiteSummer") {
            if (array?.length === 1) {
                return {
                    top: star ? "1.6rem" : "2rem",
                    left: "0.5rem",
                    gap: "0rem",
                };
            } else if (array?.length === 2) {
                return {
                    top: "2rem",
                    left: "-0.24rem",
                    gap: "1.3rem",
                };
            } else if (array?.length === 3) {
                return {
                    top: "2rem",
                    left: "-0.2rem",
                    gap: "0.45rem",
                };
            }
        } else if (name === "femaleWorkingDressWhiteSummerOptional") {
            if (array?.length === 1) {
                return {
                    top: "0.4rem",
                    left: "1.5rem",
                    gap: "0rem",
                };
            } else if (array?.length === 2) {
                return {
                    top: "0.4rem",
                    left: "0.75rem",
                    gap: "1.3rem",
                };
            } else if (array?.length === 3) {
                return {
                    top: "0.4rem",
                    left: "0.7rem",
                    gap: "0.45rem",
                };
            }
        } else if (
            name === "femaleWorkingDress3AWinter" ||
            name === "femaleWorkingDressWinterBlackModified"
        ) {
            if (array?.length === 1) {
                return {
                    top: "2.15rem",
                    left: "0.6rem",
                    gap: "0rem",
                };
            } else if (array?.length === 2) {
                return {
                    top: "2.15rem",
                    left: "-0.3rem",
                    gap: "1.3rem",
                };
            } else if (array?.length === 3) {
                return {
                    top: "2.15rem",
                    left: "-0.2rem",
                    gap: "0.45rem",
                };
            }
        } else if (
            name === "femaleWorkingDress3AWinterOptional" ||
            name === "femaleInformalMessDressRedSeaRig" ||
            name === "femaleInformalMessDressRedSeaRigAFNS" ||
            name === "femaleWorkingDressBlackOptional"
        ) {
            if (array?.length === 1) {
                return {
                    top: "0.65rem",
                    left: "1.3rem",
                    gap: "0rem",
                };
            } else if (array?.length === 2) {
                return {
                    top: "0.65rem",
                    left: "0.5rem",
                    gap: "1.3rem",
                };
            } else if (array?.length === 3) {
                return {
                    top: "0.65rem",
                    left: "0.5rem",
                    gap: "0.45rem",
                };
            }
        } else if (name === "femaleWorkingDress3WorkingSummer") {
            if (array?.length === 1) {
                return {
                    top: "1.4rem",
                    left: "1.5rem",
                    gap: "0rem",
                };
            } else if (array?.length === 2) {
                return {
                    top: "1.4rem",
                    left: "0.7rem",
                    gap: "1.3rem",
                };
            } else if (array?.length === 3) {
                return {
                    top: "1.4rem",
                    left: "0.7rem",
                    gap: "0.45rem",
                };
            }
        } else if (name === "femaleWhiteDress3AWorkingWinter") {
            if (array?.length === 1) {
                return {
                    top: "2.2rem",
                    left: "0.7rem",
                    gap: "0rem",
                };
            } else if (array?.length === 2) {
                return {
                    top: "2.2rem",
                    left: "-0.05rem",
                    gap: "1.2rem",
                };
            } else if (array?.length === 3) {
                return {
                    top: "2.2rem",
                    left: "-0.15rem",
                    gap: "0.45rem",
                };
            }
        }else if (name === "WorkingDressWhiteSummerCPOsPOs" || name === "WorkingDressWhiteSummerPOs" || name === "WorkingDressWhiteSummerLDGSBelow" || name === "WinterWorkingCPOsPOs" ) {
            if (array?.length === 1) {
                return {
                    top: star ? "-0.13rem" : "0.9rem",
                    left: "1.3rem",
                    gap: "0rem",
                };
            } else if (array?.length === 2) {
                return {
                    top: star ? "-0.11rem" : "0.9rem",
                    left: "1.5rem",
                    gap: "1.3rem",
                };
            } else if (array?.length === 3) {
                return {
                    top: "0.9rem",
                    left: "0.35rem",
                    gap: "0.55rem",
                };
            }
        }else if (name === "femaleDressNo3WorkingDressWhiteSummer" || name === "POfemaleDressNo3WorkingDressWhiteSummer" || name === "LDGfemaleDressNo3WorkingDressWhiteSummer"  ) {
            if (array?.length === 1) {
                return {
                    top: star ? "-0.13rem" : "2rem",
                    left: "0.5rem",
                    gap: "0rem",
                };
            } else if (array?.length === 2) {
                return {
                    top: star ? "-0.11rem" : "2rem",
                    left: "1.5rem",
                    gap: "1.3rem",
                };
            } else if (array?.length === 3) {
                return {
                    top: "2rem",
                    left: "1.8rem",
                    gap: "0.55rem",
                };
            }
        }else if (name === "femaleDressNo3AWorkingDressSummer" || name === "POfemaleDressNo3AWorkingDressSummer" || name === "LDGfemaleDressNo3AWorkingDressSummer"  ) {
            if (array?.length === 1) {
                return {
                    top: star ? "-0.13rem" : "2.4rem",
                    left: "1.5rem",
                    gap: "0rem",
                };
            } else if (array?.length === 2) {
                return {
                    top: star ? "-0.11rem" : "2.4rem",
                    left: "1.5rem",
                    gap: "1.3rem",
                };
            } else if (array?.length === 3) {
                return {
                    top: "2.4rem",
                    left: "1.8rem",
                    gap: "0.55rem",
                };
            }
        }
        else if (name === "SSGNCamouflageWorkingCPOs" || name === "PakMarineWorkingCPOs" ||  name === "SSGNCamouflageWorkingPOs" || name === "PakMarineWorkingPOs" || name === "SSGNCamouflageWorkingLDGSBelow"|| name === "PakMarineWorkingLDGSBelow" ) {
            if (array?.length === 1) {
                return {
                    top: star ? "-0.13rem" : "2rem",
                    left: "0.7rem",
                    gap: "0rem",
                };
            } else if (array?.length === 2) {
                return {
                    top: star ? "-0.11rem" : "2rem",
                    left: "-0.2rem",
                    gap: "1.3rem",
                };
            } else if (array?.length === 3) {
                return {
                    top: "2rem",
                    left: "-0.3rem",
                    gap: "0.55rem",
                };
            }
        }  
    }
    else {
        return {
            top: "0.52rem",
            left: "0.75rem",
            gap: "0rem",
        };
    }
};

export const CurrentLeftBicep = (name,badgeKey, array, star, DressCheck) => {
    if (DressCheck?.dressCode === 1) {
        return {
            top: "7.5rem",
            left: star ? "0.8rem" : "7.75rem",
            gap: "0rem",
        };
        
    } else if (DressCheck?.dressCode === 2) {
        return {
            top: "9.5rem",
            left: star ? "0.8rem" : "15.75rem",
            gap: "0rem",
        };
        
    } 
    else if (DressCheck?.dressCode === 3) {
        if(name === "SSGNCamouflageCeremonialCPOs" && badgeKey === "leftBiceps1"){
            return {
                top: "9.5rem",
                left: star ? "0.8rem" : "15.75rem",
                gap: "0rem",
            };

        }else if(name === "SSGNCamouflageCeremonialCPOs" && badgeKey === "leftBiceps2" ){
            return {
                top: "8.5rem",
                left: star ? "0.8rem" : "15.5rem",
                gap: "0rem",
            };
        }
        else{
            return {
                top: "9.5rem",
                left: star ? "0.8rem" : "15.75rem",
                gap: "0rem",
            };
        }
        
        
    } 
    else if (DressCheck?.dressCode === 4) {
        return {
            top: "9.5rem",
            left: star ? "0.8rem" : "7.75rem",
            gap: "0rem",
        };
        
    } 
    else {
        return {
            top: "0.52rem",
            left: "0.75rem",
            gap: "0rem",
        };
    }
};

// change Right Pocket Coordinates
export const RightPocketBox = (DressCheck, name, length) => {
    if (DressCheck?.dressCode === 3) {
        if (length === 1) {
            return {
                top:
                    name === "camoSSGNWorking_nine" || name === "camoSSGN_seven" 
                        ? "11.65rem"
                        : "11.85rem",
                left: "7.5rem",
                gap: "0rem",
            };
        } else if (length === 2) {
            return {
                top:
                    name === "camoSSGNWorking_nine" || name === "camoSSGN_seven"
                        ? "11.65rem"
                        : "11.8rem",
                left: "6.6rem",
                gap: "1.2rem",
            };
        } else if (length === 3) {
            return {
                top:
                    name === "camoSSGNWorking_nine" || name === "camoSSGN_seven"
                        ? "11.65rem"
                        : "11.8rem",
                left: "6.5rem",
                gap: ".4rem",
            };
        } else {
            return {
                top: "0.7rem",
                left: "1.05rem",
                gap: "0rem",
            };
        }
    } else if (DressCheck?.dressCode === 4) {
        if (name === "WorkingDressWhite" || name === "InformalMessDressRedSeaRig" || name === "WorkingDressWhiteSummerCPOsPOs" || name === "WorkingDressWhiteSummerPOs" || name === "WorkingDressWhiteSummerLDGSBelow" ) {
            if (length === 1) {
                return {
                    top: "10.5rem",
                    left: "6.5rem",
                    gap: "0rem",
                };
            } else if (length === 2) {
                return {
                    top: "10.5rem",
                    left: "5.7rem",
                    gap: "1.2rem",
                };
            } else if (length === 3) {
                return {
                    top: "10.5rem",
                    left: "5.6rem",
                    gap: ".4rem",
                };
            } else {
                return {
                    top: "10.5rem",
                    left: "6.5rem",
                    gap: "0rem",
                };
            }
        } else if (name === "WorkingDressWhiteWinter" || name === "WorkingWinterBlackModified" || name === "WorkingDressWhiteWinterCPOsPOs" || name === "WinterWorkingPOs" || name === "WorkingDressWhiteWinterLDGSBelow" || name === "WinterWorkingLDGSBelow" || name === "WinterWorkingCPOsPOs" || name === "WorkingDressWhiteSummerCPOsPOs" || name === "WorkingDressWhiteWinterPOs") {
            if (length === 1) {
                return {
                    top: "11.3rem",
                    left: "7.15rem",
                    gap: "0rem",
                };
            } else if (length === 2) {
                return {
                    top: "11.3rem",
                    left: "6.3rem",
                    gap: "1.2rem",
                };
            } else if (length === 3) {
                return {
                    top: "11.3rem",
                    left: "6.2rem",
                    gap: ".4rem",
                };
            } else {
                return {
                    top: "11.3rem",
                    left: "7.1rem",
                    gap: "0rem",
                };
            }
        } else if (name === "femaleWorkingDressWhiteSummer") {
            if (length === 1) {
                return {
                    top: "12.4rem",
                    left: "7.35rem",
                    gap: "0rem",
                };
            } else if (length === 2) {
                return {
                    top: "12.4rem",
                    left: "6.6rem",
                    gap: "1rem",
                };
            } else if (length === 3) {
                return {
                    top: "12.4rem",
                    left: "6.55rem",
                    gap: ".3rem",
                };
            } else {
                return {
                    top: "11.3rem",
                    left: "7.1rem",
                    gap: "0rem",
                };
            }
        } else if (name === "femaleWorkingDressWhiteSummerOptional") {
            if (length === 1) {
                return {
                    top: "11.25rem",
                    left: "7.35rem",
                    gap: "0rem",
                };
            } else if (length === 2) {
                return {
                    top: "11.25rem",
                    left: "6.6rem",
                    gap: "1rem",
                };
            } else if (length === 3) {
                return {
                    top: "11.25rem",
                    left: "6.55rem",
                    gap: ".3rem",
                };
            } else {
                return {
                    top: "11.25rem",
                    left: "7.1rem",
                    gap: "0rem",
                };
            }
        } else if (
            name === "femaleWorkingDress3AWinter" ||
            name === "femaleWorkingDressWinterBlackModified"
        ) {
            if (length === 1) {
                return {
                    top: "12.9rem",
                    left: "7.65rem",
                    gap: "0rem",
                };
            } else if (length === 2) {
                return {
                    top: "12.9rem",
                    left: "6.9rem",
                    gap: "1rem",
                };
            } else if (length === 3) {
                return {
                    top: "12.9rem",
                    left: "6.9rem",
                    gap: ".3rem",
                };
            } else {
                return {
                    top: "12.9rem",
                    left: "7.65rem",
                    gap: "0rem",
                };
            }
        } else if (
            name === "femaleWorkingDress3AWinterOptional" ||
            name === "femaleInformalMessDressRedSeaRig" ||
            name === "femaleInformalMessDressRedSeaRigAFNS" ||
            name === "femaleWorkingDressBlackOptional"
        ) {
            if (length === 1) {
                return {
                    top: "11.23rem",
                    left: "7.34rem",
                    gap: "0rem",
                };
            } else if (length === 2) {
                return {
                    top: "11.23rem",
                    left: "6.6rem",
                    gap: "1rem",
                };
            } else if (length === 3) {
                return {
                    top: "11.23rem",
                    left: "6.6rem",
                    gap: ".3rem",
                };
            } else {
                return {
                    top: "11.23rem",
                    left: "7.34rem",
                    gap: "0rem",
                };
            }
        } else if (name === "femaleWorkingDress3WorkingSummer") {
            if (length === 1) {
                return {
                    top: "12.15rem",
                    left: "7rem",
                    gap: "0rem",
                };
            } else if (length === 2) {
                return {
                    top: "12.15rem",
                    left: "6.15rem",
                    gap: "1rem",
                };
            } else if (length === 3) {
                return {
                    top: "12.15rem",
                    left: "6.15rem",
                    gap: ".3rem",
                };
            } else {
                return {
                    top: "12.15rem",
                    left: "7rem",
                    gap: "0rem",
                };
            }
        } else if (name === "femaleWhiteDress3AWorkingWinter") {
            if (length === 1) {
                return {
                    top: "12.8rem",
                    left: "7.4rem",
                    gap: "0rem",
                };
            } else if (length === 2) {
                return {
                    top: "12.8rem",
                    left: "6.7rem",
                    gap: "1rem",
                };
            } else if (length === 3) {
                return {
                    top: "12.8rem",
                    left: "6.65rem",
                    gap: ".3rem",
                };
            } else {
                return {
                    top: "12.8rem",
                    left: "7.4rem",
                    gap: "0rem",
                };
            }
        }else if (name === "SSGNCamouflageWorkingCPOs" || name === "PakMarineWorkingCPOs" || name === "SSGNCamouflageWorkingPOs"  || name === "SSGNCamouflageWorkingLDGSBelow" || name === "PakMarineWorkingLDGSBelow") {
            if (length === 1) {
                return {
                    top: "11.7rem",
                    left: "7.5rem",
                    gap: "0rem",
                };
            } else if (length === 2) {
                return {
                    top: "11.7rem",
                    left: "6.8rem",
                    gap: "1rem",
                };
            } else if (length === 3) {
                return {
                    top: "11.7rem",
                    left: "6.75rem",
                    gap: ".3rem",
                };
            } else {
                return {
                    top: "12.15rem",
                    left: "7rem",
                    gap: "0rem",
                };
            }
        }else if (name === "femaleDressNo3WorkingDressWhiteSummer" || name === "POfemaleDressNo3WorkingDressWhiteSummer" || name === "LDGfemaleDressNo3WorkingDressWhiteSummer" ) {
            if (length === 1) {
                return {
                    top: "12.7rem",
                    left: "7.7rem",
                    gap: "0rem",
                };
            } else if (length === 2) {
                return {
                    top: "12.7rem",
                    left: "7rem",
                    gap: "1rem",
                };
            } else if (length === 3) {
                return {
                    top: "12.7rem",
                    left: "6.8rem",
                    gap: ".3rem",
                };
            } else {
                return {
                    top: "12.15rem",
                    left: "7rem",
                    gap: "0rem",
                };
            }
        } else if (name === "femaleDressNo3AWorkingDressSummer" || name === "POfemaleDressNo3AWorkingDressSummer" || name === "LDGfemaleDressNo3AWorkingDressSummer") {
            if (length === 1) {
                return {
                    top: "13.1rem",
                    left: "7.1rem",
                    gap: "0rem",
                };
            } else if (length === 2) {
                return {
                    top: "13.1rem",
                    left: "6.4rem",
                    gap: "1rem",
                };
            } else if (length === 3) {
                return {
                    top: "13.1rem",
                    left: "6.4rem",
                    gap: ".3rem",
                };
            } else {
                return {
                    top: "12.15rem",
                    left: "7rem",
                    gap: "0rem",
                };
            }
        } 
        else if (name === "femaleDressNo8WinterWorking" || name === "POfemaleDressNo8WinterWorking" || name === "LDGfemaleDressNo8WinterWorking" ) {
            if (length === 1) {
                return {
                    top: "13rem",
                    left: "7rem",
                    gap: "0rem",
                };
            } else if (length === 2) {
                return {
                    top: "13rem",
                    left: "6.25rem",
                    gap: "1rem",
                };
            } else if (length === 3) {
                return {
                    top: "13rem",
                    left: "6.25rem",
                    gap: ".3rem",
                };
            } else {
                return {
                    top: "12.15rem",
                    left: "7rem",
                    gap: "0rem",
                };
            }
        } 
    } else if (DressCheck?.dressCode === 7) {
        if (name === "WinterCeremonialCPOsPOs" || name === "WinterCeremonialPOs" || name === "WinterCeremonialCPOsPOs") {
            if (length === 1) {
                return {
                    top: "10.5rem",
                    left: "6.5rem",
                    gap: "0rem",
                };
            } else if (length === 2) {
                return {
                    top: "10.5rem",
                    left: "5.7rem",
                    gap: "1.2rem",
                };
            } else if (length === 3) {
                return {
                    top: "10.5rem",
                    left: "5.6rem",
                    gap: ".4rem",
                };
            } else {
                return {
                    top: "10.5rem",
                    left: "6.5rem",
                    gap: "0rem",
                };
            }
        }
        
    }else { 
        if(name === "female_two"){
            return {
                top: "12.85rem",
                left: "7.5rem",
                gap: "0rem",
            };
        }
    }
};

export const CurrentBoxPosition = (array, keyName) => {
    return array?.find((item) => item?.keyName === keyName);
};

export const getBadgeBackground = (item, selectedOptions) => {
    // Check different conditions based on item identity and selectedOptions
    if (selectedOptions?.[item?.identity] === item?.badgeKey) {
        return "#c7e2ff";
    } else if (
        Array.isArray(selectedOptions?.[item?.identity]) &&
        selectedOptions?.[item?.identity]?.find((i) => i?.badgeKey === item?.badgeKey)
    ) {
        return "#c7e2ff";
    } else if (selectedOptions?.neckMedals?.find((i) => i?.badgeKey === item?.badgeKey)) {
        return "#c7e2ff";
    } else {
        return "";
    }

    // Default return if none of the conditions are met
};

let CurrentDressChecks = [
    {
        dressString: "FullWhiteSummerCeremonial ServiceDressWhite CeremonialSummerForCPOSANDPOS CeremonialSummerForPOS CeremonialSummerForLDGSAndBelow femaleDressNo1FullWhiteSummerCeremonials POfemaleDressNo1FullWorkingDressWhiteSummer LDGfemaleDressNo1FullWorkingDressWhiteSummer",
        dressCode: 0,
    },
    {
        dressString: "male2B male2A",
        dressCode: 1,
    },
    {
        dressString: "camoSSGN_seven camoPakMarines_six",
        dressCode: 2,
    },
    {
        dressString: "camoPakMarinesWorking_eight camoSSGNWorking_nine SSGNCamouflageCeremonialCPOs SSGNCamouflageCeremonialPOs SSGNCamouflageCeremonialLDGSBelow PakMarineCeremonialCPOs  PakMarineCeremonialPOs  PakMarineCeremonialLDGSBelow SSGNCamouflageWorkingLDGSBelow SSGNCamouflageWorkingPOs SSGNCamouflageWorkingCPOs PakMarineWorkingLDGSBelow  PakMarineWorkingPOs PakMarineWorkingCPOs",
        dressCode: 3,
    },
    {
        dressString:
            " femaleDressNo3WorkingDressWhiteSummer femaleDressNo3AWorkingDressSummer femaleDressNo8WinterWorking POfemaleDressNo3WorkingDressWhiteSummer POfemaleDressNo3AWorkingDressSummer POfemaleDressNo8WinterWorking LDGfemaleDressNo3WorkingDressWhiteSummer LDGfemaleDressNo3AWorkingDressSummer LDGfemaleDressNo8WinterWorking  femaleInformalMessDressRedSeaRig femaleWorkingDressWinterBlackModified femaleWorkingDressBlackOptional femaleWorkingDress3WorkingSummer femaleWhiteDress3AWorkingWinter femaleInformalMessDressRedSeaRigAFNS WorkingDressWhite WorkingDressWhiteWinter InformalMessDressRedSeaRig WorkingWinterBlackModified femaleWorkingDressWhiteSummer femaleWorkingDressWhiteSummerOptional femaleWorkingDress3AWinter femaleWorkingDress3AWinterOptional WorkingDressWhiteSummerCPOsPOs WorkingDressWhiteWinterCPOsPOs WinterWorkingCPOsPOs WorkingDressWhiteSummerPOs WorkingDressWhiteWinterPOs WinterWorkingPOs WorkingDressWhiteSummerLDGSBelow WorkingDressWhiteWinterLDGSBelow WinterWorkingLDGSBelow ",
        dressCode: 4,
    },
    {
        dressString: "maleFour female_four camoSSGNCombat camoPakMarinesCombat",
    },
    {
        dressString:
            "femaleMessDressSummerMessKit femaleMessDressBlackWinterMessKit femaleMessDressSummerMessKitAFNS femaleMessDressBlackWinterMessKitAFNS MessDressWhiteSummerMessKit MessDressBlackWinterMessKit",
        dressCode: 6,
    },
    {
        dressString:
            "WinterCeremonialCPOsPOs WinterCeremonialPOs WinterCeremonialLDGSBelow femaleDressNo7WinterCeremonial POfemaleDressNo7WinterCeremonial LDGfemaleDressNo7WinterCeremonial femaleServiceDressBlackAFNS femaleServiceDressBlackWithJerseyAFNS FullBlackWinterCeremonialDress ServiceBlackDressWinter femaleFullBlackWinterCeremonialDress femaleServiceBlackWinterCeremonialDress femaleFullBlackWinterCeremonialDressOptional femaleServiceBlackWinterCeremonialDressOptional femaleFullBlackWinterCeremonialDressAFNS",
        dressCode: 7,
    },
];

export const GetCurrentDressChecks = (name) => {
    return CurrentDressChecks?.find((item) => item?.dressString?.split(" ")?.includes(name));
};

// Set Right Chest Coordinates
export const GetRightBoxCord = (currentDresses, selectedOptions) => {
    let DressCheck = GetCurrentDressChecks(currentDresses?.keyName);
    if (DressCheck?.dressCode === 1) {
        if (
            selectedOptions?.leftPocketInsignia?.length === 3 &&
            selectedOptions?.rightChest?.length !== 0
        ) {
            return { cord_one: "8.65rem", cord_two: "6.15rem" };
        } else if (
            (selectedOptions?.leftPocketInsignia?.length === 3 &&
                selectedOptions?.rightChest?.length === 0) ||
            selectedOptions?.rightChest?.length === 1
        ) {
            return { cord_one: "9.4rem", cord_two: "6.15rem" };
        } else {
            return { cord_one: "10.15rem", cord_two: "6.15rem" };
        }
    } else if (DressCheck?.dressCode === 2 || DressCheck?.dressCode === 3) {
        if (
            (selectedOptions?.rightChest?.length === 0 &&
                selectedOptions?.leftPocketInsignia?.length === 3) ||
            (selectedOptions?.rightChest?.length === 1 &&
                selectedOptions?.leftPocketInsignia?.length === 0) ||
            (selectedOptions?.rightChest?.length === 1 &&
                selectedOptions?.leftPocketInsignia?.length === 2) ||
            (selectedOptions?.rightChest?.length === 2 &&
                selectedOptions?.leftPocketInsignia?.length === 1)
        ) {
            if (
                currentDresses?.keyName === "camoSSGN_seven" ||
                currentDresses?.keyName === "camoSSGNWorking_nine"
            ) {
                return { cord_one: "9.45rem", cord_two: "7.15rem" };
            } else {
                return { cord_one: "9.6rem", cord_two: "7.15rem" };
            }
        } else if (
            (selectedOptions?.rightChest?.length > 1 &&
                selectedOptions?.leftPocketInsignia?.length < 2) ||
            (selectedOptions?.rightChest?.length === 1 &&
                selectedOptions?.leftPocketInsignia?.length === 3) ||
            (selectedOptions?.rightChest?.length > 1 &&
                selectedOptions?.leftPocketInsignia?.length === 3) ||
            (selectedOptions?.rightChest?.length > 1 &&
                selectedOptions?.leftPocketInsignia?.length === 2)
        ) {
            if (
                currentDresses?.keyName === "camoSSGN_seven" ||
                currentDresses?.keyName === "camoSSGNWorking_nine"
            ) {
                return { cord_one: "8.65rem", cord_two: "7.15rem" };
            } else {
                return { cord_one: "8.8rem", cord_two: "7.15rem" };
            }
        } else {
            return { cord_one: "10.3rem", cord_two: "7.15rem" };
        }
    } else if (DressCheck?.dressCode === 4) {
        if (
            currentDresses?.keyName === "WorkingDressWhite" || 
            currentDresses?.keyName === "InformalMessDressRedSeaRig"   || currentDresses?.keyName === "SSGNCamouflageWorkingCPOs" || currentDresses?.keyName === "PakMarineWorkingCPOs" || currentDresses?.keyName === "SSGNCamouflageWorkingPOs" || currentDresses?.keyName === "PakMarineWorkingPOs" || currentDresses?.keyName === "SSGNCamouflageWorkingLDGSBelow" || currentDresses?.keyName === "PakMarineWorkingLDGSBelow"   
        ) {
            if (
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 0 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "8.6rem", cord_two: "5.6rem" };
            } else if (
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "7.9rem", cord_two: "5.6rem" };
            } else {
                
                return { cord_one: "9.4rem", cord_two: "5.6rem" };
            }
        } else if (
            currentDresses?.keyName === "WorkingDressWhiteWinter" ||
            currentDresses?.keyName === "WorkingWinterBlackModified"
        ) {
            if (
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 0 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "9.4rem", cord_two: "6.15rem" };
            } else if (
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "8.65rem", cord_two: "6.15rem" };
            } else {
                return { cord_one: "10.1rem", cord_two: "6.15rem" };
            }
        }else if (
            currentDresses?.keyName === "WorkingDressWhiteWinterCPOsPOs" ||
            currentDresses?.keyName === "WorkingDressWhiteWinterPOs" ||
            currentDresses?.keyName === "WorkingDressWhiteWinterLDGSBelow" 
        ) {
            if (
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 0 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "9.4rem", cord_two: "6.15rem" };
            } else if (
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "8.65rem", cord_two: "6.15rem" };
            } else {
                return { cord_one: "10.1rem", cord_two: "6.15rem" };
            }
        }
        else if (
            currentDresses?.keyName === "WinterWorkingCPOsPOs" || 
            currentDresses?.keyName === "WinterWorkingPOs" ||
            currentDresses?.keyName === "WinterWorkingLDGSBelow"
        ) {
            if (
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 0 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "9.4rem", cord_two: "6.15rem" };
            } else if (
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "8.65rem", cord_two: "6.15rem" };
            } else {
                return { cord_one: "10.2rem", cord_two: "6.15rem" };
            }
        }
        
        else if (
            currentDresses?.keyName === "femaleDressNo3WorkingDressWhiteSummer" ||
            currentDresses?.keyName === "POfemaleDressNo3WorkingDressWhiteSummer" ||
            currentDresses?.keyName === "LDGfemaleDressNo3WorkingDressWhiteSummer" 
        ){
            if (
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 0 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "10.7rem", cord_two: "6.4rem" };
            }
                
            else if (
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "10rem", cord_two: "6.4rem" };
            } else {
                return { cord_one: "11.5rem", cord_two: "6.4rem" };
            }
        }else if (
             currentDresses?.keyName === "femaleDressNo3AWorkingDressSummer" 
        ){
            if (
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 0 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "11.35rem", cord_two: "6.4rem" };
            }
                
            else if (
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "10.55rem", cord_two: "6.4rem" };
            } else {
                return { cord_one: "12.1rem", cord_two: "6.4rem" };
            }
        }else if (
            currentDresses?.keyName === "POfemaleDressNo3AWorkingDressSummer"  ||
            currentDresses?.keyName === "LDGfemaleDressNo3AWorkingDressSummer"  
       ){
           if (
               (selectedOptions?.rightChest?.length === 1 &&
                   selectedOptions?.leftPocketInsignia?.length === 0) ||
               (selectedOptions?.rightChest?.length === 1 &&
                   selectedOptions?.leftPocketInsignia?.length < 3) ||
               (selectedOptions?.rightChest?.length === 0 &&
                   selectedOptions?.leftPocketInsignia?.length === 3)
           ) {
               return { cord_one: "11.3rem", cord_two: "6.4rem" };
           }
               
           else if (
               (selectedOptions?.rightChest?.length > 1 &&
                   selectedOptions?.leftPocketInsignia?.length === 0) ||
               (selectedOptions?.rightChest?.length > 1 &&
                   selectedOptions?.leftPocketInsignia?.length < 3) ||
               (selectedOptions?.rightChest?.length === 1 &&
                   selectedOptions?.leftPocketInsignia?.length === 3) ||
               (selectedOptions?.rightChest?.length > 1 &&
                   selectedOptions?.leftPocketInsignia?.length === 3)
           ) {
               return { cord_one: "10.5rem", cord_two: "6.4rem" };
           } else {
               return { cord_one: "12.1rem", cord_two: "6.4rem" };
           }
       }
       else if (
            currentDresses?.keyName === "femaleDressNo8WinterWorking" ||
            currentDresses?.keyName === "POfemaleDressNo8WinterWorking"  ||
            currentDresses?.keyName === "LDGfemaleDressNo8WinterWorking"
        ){
            if (
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 0 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "11.1rem", cord_two: "6.1rem" };
            }
                
            else if (
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "10.4rem", cord_two: "6.1rem" };
            } else {
                return { cord_one: "11.9rem", cord_two: "6.1rem" };
            }
        }
        else if (currentDresses?.keyName === "WorkingDressWhiteSummerCPOsPOs" || currentDresses?.keyName === "WorkingDressWhiteSummerPOs" || currentDresses?.keyName === "WorkingDressWhiteSummerLDGSBelow") {
            if (
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 0 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "8.65rem", cord_two: "5.7rem" };
            } else if (
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "7.87rem", cord_two: "5.7rem" };
            } else {
                return { cord_one: "9.4rem", cord_two: "5.7rem" };
            }
        }  else if (currentDresses?.keyName === "femaleWorkingDressWhiteSummer") {
            if (
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 0 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "10.6rem", cord_two: "6.4rem" };
            } else if (
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "9.85rem", cord_two: "6.4rem" };
            } else {
                return { cord_one: "11.3rem", cord_two: "6.4rem" };
            }
        } else if (currentDresses?.keyName === "femaleWorkingDressWhiteSummerOptional") {
            // dress
            if (
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 0 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "9.34rem", cord_two: "6.45rem" };
            } else if (
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "8.55rem", cord_two: "6.45rem" };
            } else {
                return { cord_one: "10.05rem", cord_two: "6.45rem" };
            }
        } else if (
            currentDresses?.keyName === "femaleWorkingDress3AWinter" ||
            currentDresses?.keyName === "femaleWorkingDressWinterBlackModified"
        ) {
            if (
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 0 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "11rem", cord_two: "6.7rem" };
            } else if (
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "10.3rem", cord_two: "6.7rem" };
            } else {
                return { cord_one: "11.8rem", cord_two: "6.7rem" };
            }
        } else if (
            currentDresses?.keyName === "femaleWorkingDress3AWinterOptional" ||
            currentDresses?.keyName === "femaleInformalMessDressRedSeaRig" ||
            currentDresses?.keyName === "femaleInformalMessDressRedSeaRigAFNS" ||
            currentDresses?.keyName === "femaleWorkingDressBlackOptional"
        ) {
            let isTrue =
                currentDresses?.keyName === "femaleInformalMessDressRedSeaRig" ||
                currentDresses?.keyName === "femaleInformalMessDressRedSeaRigAFNS" ||
                currentDresses?.keyName === "femaleWorkingDressBlackOptional";
            if (
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 0 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return {
                    cord_one: isTrue ? "9.46rem" : "9.49rem",
                    cord_two: "6.45rem",
                };
            } else if (
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "8.7rem", cord_two: "6.45rem" };
            } else {
                return {
                    cord_one: isTrue ? "10.15rem" : "10.2rem",
                    cord_two: "6.45rem",
                };
            }
        } else if (currentDresses?.keyName === "femaleWorkingDress3WorkingSummer") {
            if (
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 0 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "10.3rem", cord_two: "6rem" };
            } else if (
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "9.6rem", cord_two: "6rem" };
            } else {
                return {
                    cord_one: "11.1rem",
                    cord_two: "6rem",
                };
            }
        } else if (currentDresses?.keyName === "femaleWhiteDress3AWorkingWinter") {
            if (
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 0 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "11.05rem", cord_two: "6.45rem" };
            } else if (
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 0) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length < 3) ||
                (selectedOptions?.rightChest?.length === 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3) ||
                (selectedOptions?.rightChest?.length > 1 &&
                    selectedOptions?.leftPocketInsignia?.length === 3)
            ) {
                return { cord_one: "10.3rem", cord_two: "6.45rem" };
            } else {
                return {
                    cord_one: "11.8rem",
                    cord_two: "6.45rem",
                };
            }
        }
    } else if (DressCheck?.dressCode === 5) {
        if (currentDresses?.keyName === "female_four") {
            return { cord_one: "10.9rem", cord_two: "7.2rem" };
        } else if (currentDresses?.keyName === "camoSSGNCombat") {
            return { cord_one: "10rem", cord_two: "7.3rem" };
        } else if (currentDresses?.keyName === "camoPakMarinesCombat") {
            return { cord_one: "10rem", cord_two: "7.3rem" };
        } else {
            return { cord_one: "9.6rem", cord_two: "7.2rem" };
        }
    } else if (DressCheck?.dressCode === 6) {
        if (
            currentDresses?.keyName === "femaleMessDressSummerMessKit" ||
            currentDresses?.keyName === "femaleMessDressSummerMessKitAFNS"
        ) {
            return { cord_one: "11.3rem", cord_two: "6.75rem" };
        } else if (
            currentDresses?.keyName === "femaleMessDressBlackWinterMessKit" ||
            currentDresses?.keyName === "femaleMessDressBlackWinterMessKitAFNS"
        ) {
            return { cord_one: "10.4rem", cord_two: "6.95rem" };
        } else {
            return { cord_one: "9.13rem", cord_two: "6.9rem" };
        }
    } else if (DressCheck?.dressCode === 7) {
        if (currentDresses?.dressGender === "female") {
            if (currentDresses?.keyName === "femaleServiceDressBlackAFNS") {
                return { cord_one: "11rem", cord_two: "6.1rem" };
            } else if (currentDresses?.keyName === "femaleServiceDressBlackWithJerseyAFNS") {
                return { cord_one: "11.8rem", cord_two: "6.6rem" };
            } else if (
                currentDresses?.keyName === "femaleFullBlackWinterCeremonialDressOptional" ||
                currentDresses?.keyName === "femaleServiceBlackWinterCeremonialDressOptional" ||
                currentDresses?.keyName === "femaleFullBlackWinterCeremonialDressAFNS"
            ) {
                return { cord_one: "8.7rem", cord_two: "5rem" };
            }else if(
                currentDresses?.keyName === "femaleDressNo7WinterCeremonial" ||
                currentDresses?.keyName === "POfemaleDressNo7WinterCeremonial" ||
                currentDresses?.keyName === "LDGfemaleDressNo7WinterCeremonial"
            ){
                return { cord_one: "12rem", cord_two: "6.1rem" };
            }
             else {
                return { cord_one: "9.1rem", cord_two: "4.9rem" };
            }
        } else {
            if (
                currentDresses?.keyName === "WinterCeremonialCPOsPOs" ||
                currentDresses?.keyName === "WinterCeremonialPOs" ||
                currentDresses?.keyName === "WinterCeremonialLDGSBelow"
            ) {
                return { cord_one: "10.2rem", cord_two: "6.1rem" };
            }
            return { cord_one: "7.8rem", cord_two: "4.4rem" };
        }
    } else if (DressCheck?.dressCode === 0) {
        if (selectedOptions?.rightChest?.length === 0) {
            if (currentDresses?.dressGender === "female") {
                if(currentDresses?.keyName === "femaleDressNo1FullWhiteSummerCeremonials" || currentDresses?.keyName === "POfemaleDressNo1FullWorkingDressWhiteSummer" || currentDresses?.keyName === "LDGfemaleDressNo1FullWorkingDressWhiteSummer"){
                    return { cord_one: "11.5rem", cord_two: "6.2rem" };
                }
                return { cord_one: "10.5rem", cord_two: "6.15rem" };
            } else {
                if(currentDresses?.keyName === "CeremonialSummerForCPOSANDPOS" || currentDresses?.keyName === "CeremonialSummerForPOS" || currentDresses?.keyName === "CeremonialSummerForLDGSAndBelow"){
                    return { cord_one: "9.3rem", cord_two: "5.5rem" };
                }
                return { cord_one: "10.13rem", cord_two: "6.2rem" };
            }
        } else if (selectedOptions?.rightChest?.length !== 0) {
            if (currentDresses?.dressGender === "female") {
                if(currentDresses?.keyName === "femaleDressNo1FullWhiteSummerCeremonials" || currentDresses?.keyName === "POfemaleDressNo1FullWorkingDressWhiteSummer" || currentDresses?.keyName === "LDGfemaleDressNo1FullWorkingDressWhiteSummer"){
                    return { cord_one: "10.7rem", cord_two: "6.2rem" };
                }
                return { cord_one: "9.75rem", cord_two: "6.15rem" };
            } else {
                if(currentDresses?.keyName === "CeremonialSummerForCPOSANDPOS" || currentDresses?.keyName === "CeremonialSummerForPOS" || currentDresses?.keyName === "CeremonialSummerForLDGSAndBelow"){
                    return { cord_one: "8.55rem", cord_two: "5.5rem" };
                }
                return { cord_one: "9.35rem", cord_two: "6.2rem" };
            }
        } else {
            return { cord_one: "9.8rem", cord_two: "6.2rem" };
        }
    } else if (currentDresses.keyName === "female_one" || currentDresses.keyName === "female_three"){
        if (selectedOptions?.rightChest?.length === 0) {
            return { cord_one: "11.2rem", cord_two: "6.2rem" };
        } else if (selectedOptions?.rightChest?.length !== 0) {
           return { cord_one: "10.5rem", cord_two: "6.2rem" };
        } else {
            return { cord_one: "10.5rem", cord_two: "6.2rem" };
        }
    } else if (currentDresses.keyName === "femaleFive" || currentDresses.keyName === "femaleSeven"){
        if (selectedOptions?.rightChest?.length === 0) {
            return { cord_one: "11.3rem", cord_two: "6.2rem" };
        } else if (selectedOptions?.rightChest?.length !== 0) {
           return { cord_one: "10.5rem", cord_two: "6.2rem" };
        } else {
            return { cord_one: "10.5rem", cord_two: "6.2rem" };
        }
    }  else if (currentDresses.keyName === "femaleMessDressSummerMessKit" || currentDresses.keyName === "femaleInformalMessDressRedSeaRig"){
        if (selectedOptions?.rightChest?.length === 0) {
            return { cord_one: "11.3rem", cord_two: "6.2rem" };
        } else if (selectedOptions?.rightChest?.length !== 0) {
           return { cord_one: "10.5rem", cord_two: "6.2rem" };
        } else {
            return { cord_one: "10.5rem", cord_two: "6.2rem" };
        }
    } else if (currentDresses.keyName === "female_two" ){
        if (selectedOptions?.rightChest?.length === 0) {
            return { cord_one: "11.3rem", cord_two: "6.2rem" };
        } else if (selectedOptions?.rightChest?.length !== 0) {
           return { cord_one: "10.5rem", cord_two: "6.2rem" };
        } else {
            return { cord_one: "10.5rem", cord_two: "6.2rem" };
        }
    } else if (currentDresses.keyName === "femaleSix" ){
        if (selectedOptions?.rightChest?.length === 0) {
            return { cord_one: "11.6rem", cord_two: "6.2rem" };
        } else if (selectedOptions?.rightChest?.length !== 0) {
           return { cord_one: "10.7rem", cord_two: "6.2rem" };
        } else {
            return { cord_one: "10.5rem", cord_two: "6.2rem" };
        }
    }
    else {
        if (selectedOptions?.rightChest?.length === 0) {
            if (currentDresses?.dressGender === "female") {
                return { cord_one: "11.5rem", cord_two: "6.15rem" };// change position of name tally and Flag for CPOs etc
            } else {
                return { cord_one: "9.13rem", cord_two: "5.6rem" };// change position of name tally and Flag for CPOs etc
            }
        } else if (selectedOptions?.rightChest?.length !== 0) {
            if (currentDresses?.dressGender === "female") {
                return { cord_one: "9.75rem", cord_two: "6.15rem" };
            } else {
                return { cord_one: "9.35rem", cord_two: "6.2rem" };
            }
        } else {
            return { cord_one: "9.8rem", cord_two: "6.2rem" };
        }
    }
};

export const GetMedalsPositionCurrent = (medals, DressCheck, currentDresses) => {
    if (DressCheck?.dressCode === 2 || DressCheck?.dressCode === 3) {
        if (medals?.length === 1) {
            return "12.2rem";
        } else if (medals?.length === 2) {
            return "12rem";
        } else if (medals?.length === 3) {
            return "11.8rem";
        } else if (medals?.length === 4) {
            return "11.6rem";
        } else if (medals?.length === 5) {
            return "11.4rem";
        } else if (medals?.length === 6) {
            return "11.2rem";
        } else {
            return "11rem";
        }

    }else if(currentDresses?.keyName === "FullWhiteSummerCeremonial"){
         if (medals?.length === 1) {
            return "12.5rem";
        } else if (medals?.length === 2) {
            return "12.3rem";
        } else if (medals?.length === 3) {
            return "12.1rem";
        } else if (medals?.length === 4) {
            return "11.9rem";
        } else if (medals?.length === 5) {
            return "11.7rem";
        } else if (medals?.length === 6) {
            return "11.5rem";
        } else {
            return "11.3rem";
        }
    } else if (DressCheck?.dressCode === 6) {
        if (currentDresses?.dressGender === "female") {
            if (
                currentDresses?.keyName === "femaleMessDressBlackWinterMessKit" ||
                currentDresses?.keyName === "femaleMessDressBlackWinterMessKitAFNS"
            ) {
                if (medals?.length === 1) {
                    return "12.45rem";
                } else if (medals?.length === 2) {
                    return "12.35rem";
                } else if (medals?.length === 3) {
                    return "12.25rem";
                } else if (medals?.length === 4) {
                    return "12.15rem";
                } else if (medals?.length === 5) {
                    return "12.05rem";
                } else if (medals?.length === 6) {
                    return "11.95rem";
                } else {
                    return "11.85rem";
                }
            } else {
                if (medals?.length === 1) {
                    return "12.65rem";
                } else if (medals?.length === 2) {
                    return "12.4rem";
                } else if (medals?.length === 3) {
                    return "12.25rem";
                } else if (medals?.length === 4) {
                    return "12rem";
                } else if (medals?.length === 5) {
                    return "11.8rem";
                } else if (medals?.length === 6) {
                    return "11.6rem";
                } else {
                    return "11.45rem";
                }
            }
        } else {
            if (medals?.length === 7) {
                return "11.8rem";
            } else if (medals?.length === 2) {
                return "12.35rem";
            } else if (medals?.length === 3) {
                return "12.2rem";
            } else if (medals?.length === 4) {
                return "12.1rem";
            } else if (medals?.length === 5) {
                return "12rem";
            } else if (medals?.length === 6) {
                return "11.9rem";
            } else {
                return "12.45rem";
            }
        }
    } else if (DressCheck?.dressCode === 7) {
        if (currentDresses?.dressGender === "female") {
            if( currentDresses.keyName === "femaleDressNo7WinterCeremonial" ||
                currentDresses.keyName === "POfemaleDressNo7WinterCeremonial" ||
                currentDresses.keyName === "LDGfemaleDressNo7WinterCeremonial" 
            ){
                if (medals?.length === 1) {
                    return "13rem";
                } else if (medals?.length === 2) {
                    return "12.8rem";
                } else if (medals?.length === 3) {
                    return "12.6rem";
                } else if (medals?.length === 4) {
                    return "12.4rem";
                } else if (medals?.length === 5) {
                    return "12.2rem";
                } else if (medals?.length === 6) {
                    return "12rem";
                } else {
                    return "11.8rem";
                }    
            }
            if (medals?.length === 1) {
                return "14.2rem";
            } else if (medals?.length === 2) {
                return "14rem";
            } else if (medals?.length === 3) {
                return "13.8rem";
            } else if (medals?.length === 4) {
                return "13.6rem";
            } else if (medals?.length === 5) {
                return "13.4rem";
            } else if (medals?.length === 6) {
                return "13rem";
            } else {
                return "12.8rem";
            }
        } else {
            if(currentDresses.keyName === "WinterCeremonialCPOsPOs" || currentDresses.keyName === "WinterCeremonialPOs" || currentDresses.keyName === "WinterCeremonialLDGSBelow"){
                if (medals?.length === 1) {
                    return "12.5rem";
                } else if (medals?.length === 2) {
                    return "12.3rem";
                } else if (medals?.length === 3) {
                    return "12.1rem";
                } else if (medals?.length === 4) {
                    return "11.9rem";
                } else if (medals?.length === 5) {
                    return "11.7rem";
                } else if (medals?.length === 6) {
                    return "11.5rem";
                } else {
                    return "11.3rem";
                }
            }
            if (medals?.length === 1) {
                return "13.7rem";
            } else if (medals?.length === 2) {
                return "13.5rem";
            } else if (medals?.length === 3) {
                return "13.3rem";
            } else if (medals?.length === 4) {
                return "13.1rem";
            } else if (medals?.length === 5) {
                return "12.9rem";
            } else if (medals?.length === 6) {
                return "12.7rem";
            } else {
                return "12.5rem";
            }
        }
    } else if (currentDresses?.keyName === "female_three") {
        if (medals?.length === 1) {
            return "12.85rem";
        } else if (medals?.length === 2) {
            return "12.6rem";
        } else if (medals?.length === 3) {
            return "12.4rem";
        } else if (medals?.length === 4) {
            return "12.2rem";
        } else if (medals?.length === 5) {
            return "12rem";
        } else if (medals?.length === 6) {
            return "11.8rem";
        } else if (medals?.length === 7) {
            return "11.65rem";
        } else {
            return "11.65rem";
        }
    } else if (DressCheck?.dressCode === 0) {
        if(currentDresses.keyName === "CeremonialSummerForCPOSANDPOS" || currentDresses?.keyName === "CeremonialSummerForPOS" || currentDresses?.keyName === "CeremonialSummerForLDGSAndBelow"){
            if (medals?.length === 1) {
                return "12.8rem";
            } else if (medals?.length === 2) {
                return "12.6rem";
            } else if (medals?.length === 3) {
                return "12.4rem";
            } else if (medals?.length === 4) {
                return "12.2rem";
            } else if (medals?.length === 5) {
                return "12rem";
            } else if (medals?.length === 6) {
                return "11.8rem";
            } else {
                return "11.6rem";
            }
        }else if(currentDresses?.keyName === "femaleDressNo1FullWhiteSummerCeremonials" || currentDresses?.keyName === "POfemaleDressNo1FullWorkingDressWhiteSummer" || currentDresses?.keyName === "LDGfemaleDressNo1FullWorkingDressWhiteSummer"){
            if (medals?.length === 1) {
                return "12.4rem";
            } else if (medals?.length === 2) {
                return "12.1rem";
            } else if (medals?.length === 3) {
                return "11.9rem";
            } else if (medals?.length === 4) {
                return "11.7rem";
            } else if (medals?.length === 5) {
                return "11.5rem";
            } else if (medals?.length === 6) {
                return "11.3rem";
            } else {
                return "11.1rem";
            }
        }
    } 
    else if(currentDresses.keyName === "WinterCeremonialCPOsPOs"){
       
            if (medals?.length === 1) {
                return "12.5rem";
            } else if (medals?.length === 2) {
                return "12.3rem";
            } else if (medals?.length === 3) {
                return "12.1rem";
            } else if (medals?.length === 4) {
                return "11.9rem";
            } else if (medals?.length === 5) {
                return "11.7rem";
            } else if (medals?.length === 6) {
                return "11.5rem";
            } else {
                return "11.3rem";
            }
        
    } 
    else {
        if (medals?.length === 1) {
            return "12.4rem";
        } else if (medals?.length === 2) {
            return "12.3rem";
        } else if (medals?.length === 3) {
            return "12.1rem";
        } else if (medals?.length === 4) {
            return "11.9rem";
        } else if (medals?.length === 5) {
            return "11.7rem";
        } else if (medals?.length === 6) {
            return "11.45rem";
        } else {
            return "11.4rem";
        }
    }
};

export const GetLeftChestCord = (currentDresses, medals, currentBadgesStateMedals) => {
    let DressCheck = GetCurrentDressChecks(currentDresses?.keyName);
    let updated_cord;
    if (currentBadgesStateMedals?.length > 0) {
        updated_cord = GetMedalsPositionCurrent(medals, DressCheck, currentDresses);
    }

    if (DressCheck?.dressCode === 2 || DressCheck?.dressCode === 3) {
        return {
            cord_one: "10.9rem",
            cord_two: updated_cord ? updated_cord : "11rem",
        };
    } else if (DressCheck?.dressCode === 6) {
        if (currentDresses?.dressGender === "female") {
            if (
                currentDresses?.keyName === "femaleMessDressBlackWinterMessKitAFNS" ||
                currentDresses?.keyName === "femaleMessDressBlackWinterMessKit"
            ) {
                return {
                    cord_one: "10.85rem",
                    cord_two: updated_cord ? updated_cord : "11.85rem",
                };
            } else {
                return {
                    cord_one: "10.8rem",
                    cord_two: updated_cord ? updated_cord : "11.5rem",
                };
            }
        } else {
            return {
                cord_one: "10.05rem",
                cord_two: updated_cord ? updated_cord : "11.9rem",
            };
        }
    } else if (DressCheck?.dressCode === 7) {
        if (currentDresses?.dressGender === "female") {
            if (
                currentDresses?.keyName === "femaleFullBlackWinterCeremonialDressOptional" ||
                currentDresses?.keyName === "femaleServiceBlackWinterCeremonialDressOptional" ||
                currentDresses?.keyName === "femaleFullBlackWinterCeremonialDressAFNS"
            ) {
                return {
                    cord_one: "9.6rem",
                    cord_two: updated_cord ? updated_cord : "12.6rem",
                };
            } else if(
                currentDresses?.keyName === "femaleDressNo7WinterCeremonial" ||
                currentDresses?.keyName === "POfemaleDressNo7WinterCeremonial" ||
                currentDresses?.keyName === "LDGfemaleDressNo7WinterCeremonial"
            ){
                return {
                    cord_one: "11.7rem",
                    cord_two: updated_cord ? updated_cord : "12.6rem",
                };

            } 
            else {
                return {
                    cord_one: "9.7rem",
                    cord_two: updated_cord ? updated_cord : "12.7rem",
                };
            }
        } else {
            if(currentDresses?.keyName === "WinterCeremonialCPOsPOs" || currentDresses?.keyName === "WinterCeremonialPOs" || currentDresses?.keyName === "WinterCeremonialLDGSBelow"){
                return {
                    cord_one: "10rem",
                    cord_two: updated_cord ? updated_cord : "12.6rem",
                };
            }
            return {
                cord_one: "8.4rem",
                cord_two: updated_cord ? updated_cord : "12.6rem",
            };
        }
    } else if (currentDresses?.keyName === "female_three") {
        return {
            cord_one: "10.6rem",
            cord_two: updated_cord ? updated_cord : "11.65rem",
        };
    } else {
        if (currentDresses?.dressGender === "female") {
            if(currentDresses.keyName === "femaleDressNo1FullWhiteSummerCeremonials" || currentDresses.keyName === "POfemaleDressNo1FullWorkingDressWhiteSummer" ){
                return {
                    cord_one: "11.52rem",
                    cord_two: updated_cord ? updated_cord : "11.4rem",
                };
            }
            else if( currentDresses.keyName === "femaleDressNo8WinterWorking" || currentDresses.keyName === "POfemaleDressNo8WinterWorking" || currentDresses.keyName === "LDGfemaleDressNo8WinterWorking"){
                return {
                    cord_one: "12.7rem",
                    cord_two: updated_cord ? updated_cord : "12.7rem",
                };
            } else if(currentDresses?.keyName === "LDGfemaleDressNo1FullWorkingDressWhiteSummer"){
                return {
                    cord_one: "11.52rem",
                    cord_two: updated_cord ? updated_cord : "11.4rem",
                };
            }
            else{
                return {
                    cord_one: "10.52rem",
                    cord_two: updated_cord ? updated_cord : "11.4rem",
                };
            }
            
        } else {
            if(currentDresses.keyName === "WorkingDressWhiteWinterCPOsPOs" || currentDresses.keyName === "WorkingDressWhiteWinterPOs" || currentDresses.keyName === "WorkingDressWhiteWinterLDGSBelow" || currentDresses.keyName === "WinterWorkingPOs" || currentDresses.keyName === "WinterWorkingLDGSBelow"){
                return {
                    cord_one: "11rem",
                    cord_two: updated_cord ? updated_cord : "12.2rem",
                };
            }
            return {
                cord_one: "9.5rem",
                cord_two: updated_cord ? updated_cord : "11.4rem",
            };
        }
    }
};

export const LeftPocketPositions = (name, DressCheck, selectedOptions, currentBadgesState) => {
    let ribbonsLength = selectedOptions?.ribbon?.length;
    let ribbonsData = currentBadgesState?.ribbon?.length;
    if (DressCheck?.dressCode === 2) {
        if (
            selectedOptions?.leftPocketInsignia?.length === 1 &&
            selectedOptions?.rightChest?.length === 0
        ) {
            return {
                cord_one: name === "camoSSGN_seven" ? "9.9rem" : "9.95rem",
                cord_two: "11.6rem",
            };
        } else if (
            selectedOptions?.leftPocketInsignia?.length === 1 &&
            selectedOptions?.rightChest?.length !== 0
        ) {
            return {
                cord_one: name === "camoSSGN_seven" ? "9.2rem" : "9.2rem",
                cord_two: "11.6rem",
            };
        } else if (
            (selectedOptions?.leftPocketInsignia?.length === 2 &&
                selectedOptions?.rightChest?.length !== 0) ||
            selectedOptions?.leftPocketInsignia?.length === 3 ||
            selectedOptions?.leftPocketInsignia?.length === 2
        ) {
            return {
                cord_one: name === "camoSSGN_seven" ? "8.9rem" : "9.1rem",
                cord_two: "11.6rem",
            };
        } else {
            return {
                cord_one: "9.8rem",
                cord_two: "11.7rem",
            };
        }
    } else if (DressCheck?.dressCode === 3) {
        if (ribbonsLength > 4 && ribbonsLength <= 8) {
            if (
                selectedOptions?.leftPocketInsignia?.length === 1 &&
                selectedOptions?.rightChest?.length === 0
            ) {
                return {
                    cord_one: name === "camoSSGNWorking_nine" ? "10.4rem" : "10.55rem",
                    cord_two: "11.6rem",
                };
            } else if (
                selectedOptions?.leftPocketInsignia?.length === 1 &&
                selectedOptions?.rightChest?.length !== 0
            ) {
                return {
                    cord_one: name === "camoSSGNWorking_nine" ? "9.6rem" : "9.6rem",
                    cord_two: "11.6rem",
                };
            } else if (
                (selectedOptions?.leftPocketInsignia?.length === 2 &&
                    selectedOptions?.rightChest?.length !== 0) ||
                selectedOptions?.leftPocketInsignia?.length === 3 ||
                selectedOptions?.leftPocketInsignia?.length === 2
            ) {
                return {
                    cord_one: name === "camoSSGNWorking_nine" ? "9.4rem" : "9.6rem",
                    cord_two: "11.6rem",
                };
            } else {
                return {
                    cord_one: "10.55rem",
                    cord_two: "11.7rem",
                };
            }
        } else if (ribbonsLength > 8 && ribbonsLength <= 12) {
            if (
                selectedOptions?.leftPocketInsignia?.length === 1 &&
                selectedOptions?.rightChest?.length === 0
            ) {
                return {
                    cord_one: name === "camoSSGNWorking_nine" ? "10.2rem" : "10.35rem",
                    cord_two: "11.6rem",
                };
            } else if (
                selectedOptions?.leftPocketInsignia?.length === 1 &&
                selectedOptions?.rightChest?.length !== 0
            ) {
                return {
                    cord_one: name === "camoSSGNWorking_nine" ? "9.4rem" : "9.4rem",
                    cord_two: "11.6rem",
                };
            } else if (
                (selectedOptions?.leftPocketInsignia?.length === 2 &&
                    selectedOptions?.rightChest?.length !== 0) ||
                selectedOptions?.leftPocketInsignia?.length === 3 ||
                selectedOptions?.leftPocketInsignia?.length === 2
            ) {
                return {
                    cord_one: name === "camoSSGNWorking_nine" ? "9.2rem" : "9.4rem",
                    cord_two: "11.6rem",
                };
            } else {
                return {
                    cord_one: "10.2rem",
                    cord_two: "11.7rem",
                };
            }
        } else if (ribbonsLength > 12 && ribbonsLength <= 16) {
            if (
                selectedOptions?.leftPocketInsignia?.length === 1 &&
                selectedOptions?.rightChest?.length === 0
            ) {
                return {
                    cord_one: name === "camoSSGNWorking_nine" ? "9.9rem" : "9.95rem",
                    cord_two: "11.6rem",
                };
            } else if (
                selectedOptions?.leftPocketInsignia?.length === 1 &&
                selectedOptions?.rightChest?.length !== 0
            ) {
                return {
                    cord_one: name === "camoSSGNWorking_nine" ? "9.2rem" : "9.2rem",
                    cord_two: "11.6rem",
                };
            } else if (
                (selectedOptions?.leftPocketInsignia?.length === 2 &&
                    selectedOptions?.rightChest?.length !== 0) ||
                selectedOptions?.leftPocketInsignia?.length === 3 ||
                selectedOptions?.leftPocketInsignia?.length === 2
            ) {
                return {
                    cord_one: name === "camoSSGNWorking_nine" ? "8.9rem" : "9.1rem",
                    cord_two: "11.6rem",
                };
            } else {
                return {
                    cord_one: "9.8rem",
                    cord_two: "11.7rem",
                };
            }
        } else {
            if( name === "SSGNCamouflageCeremonialCPOs" ||  name === "SSGNCamouflageCeremonialPOs" ||  name === "SSGNCamouflageCeremonialLDGSBelow" || name === "PakMarineCeremonialCPOs" || name === "PakMarineCeremonialPOs" || name === "PakMarineCeremonialLDGSBelow"){
                if (
                    selectedOptions?.leftPocketInsignia?.length === 1 &&
                    selectedOptions?.rightChest?.length === 0
                ) {
                    return {
                        cord_one: "9.75rem",
                        cord_two: "11.6rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length === 1 &&
                    selectedOptions?.rightChest?.length !== 0
                ) {
                    return {
                        cord_one: "8.8rem",
                        cord_two: "11.6rem",
                    };
                } else if (
                    (selectedOptions?.leftPocketInsignia?.length === 2 &&
                        selectedOptions?.rightChest?.length !== 0) ||
                    selectedOptions?.leftPocketInsignia?.length === 3 ||
                    selectedOptions?.leftPocketInsignia?.length === 2
                ) {
                    return {
                        cord_one: "8.8rem",
                        cord_two: "11.6rem",
                    };
                } else {
                    return {
                        cord_one: "9.8rem",
                        cord_two: "11.7rem",
                    };
                }
            }
            if (
                selectedOptions?.leftPocketInsignia?.length === 1 &&
                selectedOptions?.rightChest?.length === 0
            ) {
                return {
                    cord_one: name === "camoSSGNWorking_nine" ? "10.6rem" : "10.75rem",
                    cord_two: "11.6rem",
                };
            } else if (
                selectedOptions?.leftPocketInsignia?.length === 1 &&
                selectedOptions?.rightChest?.length !== 0
            ) {
                return {
                    cord_one: name === "camoSSGNWorking_nine" ? "9.8rem" : "9.8rem",
                    cord_two: "11.6rem",
                };
            } else if (
                (selectedOptions?.leftPocketInsignia?.length === 2 &&
                    selectedOptions?.rightChest?.length !== 0) ||
                selectedOptions?.leftPocketInsignia?.length === 3 ||
                selectedOptions?.leftPocketInsignia?.length === 2
            ) {
                return {
                    cord_one: name === "camoSSGNWorking_nine" ? "9.6rem" : "9.8rem",
                    cord_two: "11.6rem",
                };
            } else {
                return {
                    cord_one: "10.55rem",
                    cord_two: "11.7rem",
                };
            }
        }
    } else if (DressCheck?.dressCode === 1) {
        if (ribbonsLength > 4 && ribbonsLength <= 8) {
            if (selectedOptions?.leftPocketInsignia?.length === 1) {
                return {
                    cord_one: "10rem",
                    cord_two: "11.7rem",
                };
            } else if (selectedOptions?.leftPocketInsignia?.length > 1) {
                return {
                    cord_one: "9.05rem",
                    cord_two: "11.7rem",
                };
            }
        } else if (ribbonsLength > 8 && ribbonsLength <= 12) {
            if (selectedOptions?.leftPocketInsignia?.length === 1) {
                return {
                    cord_one: "9.7rem",
                    cord_two: "11.7rem",
                };
            } else if (selectedOptions?.leftPocketInsignia?.length > 1) {
                return {
                    cord_one: "8.85rem",
                    cord_two: "11.7rem",
                };
            }
        } else if (ribbonsLength > 12 && ribbonsLength <= 16) {
            if (selectedOptions?.leftPocketInsignia?.length === 1) {
                return {
                    cord_one: "9.5rem",
                    cord_two: "11.7rem",
                };
            } else if (selectedOptions?.leftPocketInsignia?.length > 1) {
                return {
                    cord_one: "8.6rem",
                    cord_two: "11.7rem",
                };
            }
        } else {
            if (selectedOptions?.leftPocketInsignia?.length === 1) {
                return {
                    cord_one: ribbonsData === 0 ? "9.43rem" : "10.2rem",
                    cord_two: "11.7rem",
                };
            } else if (selectedOptions?.leftPocketInsignia?.length > 1) {
                return {
                    cord_one: ribbonsData === 0 ? "8.65rem" : "9.3rem",
                    cord_two: "11.7rem",
                };
            }
        }
    } else if (DressCheck?.dressCode === 4) {
        if (name === "WorkingDressWhite" || name === "InformalMessDressRedSeaRig" ) {
            if (ribbonsLength > 4 && ribbonsLength <= 8) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.3rem",
                        cord_two: "12.3rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "8.5rem",
                        cord_two: "12.3rem",
                    };
                }
            } else if (ribbonsLength > 8 && ribbonsLength <= 12) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.1rem",
                        cord_two: "12.3rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "8.2rem",
                        cord_two: "12.3rem",
                    };
                }
                /// back-run
            } else if (ribbonsLength > 12 && ribbonsLength <= 16) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "8.9rem",
                        cord_two: "12.3rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "8rem",
                        cord_two: "12.3rem",
                    };
                }
            } else {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.6rem",
                        cord_two: "12.3rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "8.75rem",
                        cord_two: "12.3rem",
                    };
                }
            }
        }else if (name === "WorkingDressWhiteSummerCPOsPOs" || name === "WorkingDressWhiteSummerPOs" || name === "WorkingDressWhiteSummerLDGSBelow") {
            if (ribbonsLength > 4 && ribbonsLength <= 8) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.3rem",
                        cord_two: "12.3rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "8.5rem",
                        cord_two: "12.3rem",
                    };
                }
            } else if (ribbonsLength > 8 && ribbonsLength <= 12) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.1rem",
                        cord_two: "12.3rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "8.2rem",
                        cord_two: "12.3rem",
                    };
                }
                /// back-run
            } else if (ribbonsLength > 12 && ribbonsLength <= 16) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "8.9rem",
                        cord_two: "12.3rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "8rem",
                        cord_two: "12.3rem",
                    };
                }
            } else {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.6rem",
                        cord_two: "12.3rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "8.75rem",
                        cord_two: "12.3rem",
                    };
                }
            }
        } 
        else if (name === "femaleDressNo3WorkingDressWhiteSummer" || name === "POfemaleDressNo3WorkingDressWhiteSummer" || name === "LDGfemaleDressNo3WorkingDressWhiteSummer") {
            if (ribbonsLength > 4 && ribbonsLength <= 8) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11.4rem",
                        cord_two: "11.7rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.6rem",
                        cord_two: "11.7rem",
                    };
                }
            } else if (ribbonsLength > 8 && ribbonsLength <= 12) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11.1rem",
                        cord_two: "11.7rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.3rem",
                        cord_two: "11.7rem",
                    };
                }
                /// back-run
            } else if (ribbonsLength > 12 && ribbonsLength <= 16) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.8rem",
                        cord_two: "11.7rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10rem",
                        cord_two: "11.7rem",
                    };
                }
            } else {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11.1rem",
                        cord_two: "11.7rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.3rem",
                        cord_two: "11.7rem",
                    };
                }
            }
        } 
        else if (name === "WorkingDressWhiteWinterCPOsPOs" || name === "WorkingDressWhiteWinterPOs" || name === "WorkingDressWhiteWinterLDGSBelow" || name === "WinterWorkingCPOsPOs" || name === "WinterWorkingPOs" || name === "WinterWorkingLDGSBelow") {
            if (ribbonsLength > 4 && ribbonsLength <= 8) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.2rem",
                        cord_two: "11.8rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.2rem",
                        cord_two: "11.8rem",
                    };
                }
            } else if (ribbonsLength > 8 && ribbonsLength <= 12) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.8rem",
                        cord_two: "11.8rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "8.9rem",
                        cord_two: "11.8rem",
                    };
                }
                /// back-run
            } else if (ribbonsLength > 12 && ribbonsLength <= 16) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.5rem",
                        cord_two: "11.8rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "8.7rem",
                        cord_two: "11.8rem",
                    };
                }
            } else {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.9rem",
                        cord_two: "11.8rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.3rem",
                        cord_two: "11.8rem",
                    };
                }
            }
        } 
        else if (name === "femaleDressNo3AWorkingDressSummer"  || name === "LDGfemaleDressNo3AWorkingDressSummer") {
            if (ribbonsLength > 4 && ribbonsLength <= 8) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11.6rem",
                        cord_two: "12.4rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.6rem",
                        cord_two: "12.4rem",
                    };
                }
            } else if (ribbonsLength > 8 && ribbonsLength <= 12) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11.1rem",
                        cord_two: "12.4rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.6rem",
                        cord_two: "12.4rem",
                    };
                }
                /// back-run
            } else if (ribbonsLength > 12 && ribbonsLength <= 16) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11.1rem",
                        cord_two: "12.4rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.4rem",
                        cord_two: "12.4rem",
                    };
                }
            } else {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11.7rem",
                        cord_two: "12.4rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.8rem",
                        cord_two: "12.4rem",
                    };
                }
            }
        } 
        else if (name === "POfemaleDressNo3AWorkingDressSummer" ) {
            if (ribbonsLength > 4 && ribbonsLength <= 8) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11.9rem",
                        cord_two: "12.4rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.6rem",
                        cord_two: "12.4rem",
                    };
                }
            } else if (ribbonsLength > 8 && ribbonsLength <= 12) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11.1rem",
                        cord_two: "12.4rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.6rem",
                        cord_two: "12.4rem",
                    };
                }
                /// back-run
            } else if (ribbonsLength > 12 && ribbonsLength <= 16) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11.1rem",
                        cord_two: "12.4rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.4rem",
                        cord_two: "12.4rem",
                    };
                }
            } else {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "12rem",
                        cord_two: "12.4rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11rem",
                        cord_two: "12.4rem",
                    };
                }
            }
        } 
        else if (name === "femaleDressNo8WinterWorking"  || name === "POfemaleDressNo8WinterWorking" || name === "LDGfemaleDressNo8WinterWorking") {
            if (ribbonsLength > 4 && ribbonsLength <= 8) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11.6rem",
                        cord_two: "12.4rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.6rem",
                        cord_two: "12.4rem",
                    };
                }
            } else if (ribbonsLength > 8 && ribbonsLength <= 12) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11.1rem",
                        cord_two: "12.4rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.6rem",
                        cord_two: "12.4rem",
                    };
                }
                /// back-run
            } else if (ribbonsLength > 12 && ribbonsLength <= 16) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11.1rem",
                        cord_two: "12.4rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.4rem",
                        cord_two: "12.4rem",
                    };
                }
            } else {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11.7rem",
                        cord_two: "12.4rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.8rem",
                        cord_two: "12.4rem",
                    };
                }
            }
        } 
        else if (name === "WorkingDressWhiteWinter" || name === "WorkingWinterBlackModified") {
            if (ribbonsLength > 4 && ribbonsLength <= 8) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10rem",
                        cord_two: "11.9rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.15rem",
                        cord_two: "11.9rem",
                    };
                }
            } else if (ribbonsLength > 8 && ribbonsLength <= 12) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.8rem",
                        cord_two: "11.9rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9rem",
                        cord_two: "11.9rem",
                    };
                }
            } else if (ribbonsLength > 12 && ribbonsLength <= 16) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.55rem",
                        cord_two: "11.9rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "8.7rem",
                        cord_two: "11.9rem",
                    };
                }
            } else {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.25rem",
                        cord_two: "11.9rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.4rem",
                        cord_two: "11.9rem",
                    };
                }
            }
        } else if (name === "femaleWorkingDressWhiteSummer") {
            if (ribbonsLength > 4 && ribbonsLength <= 8) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11rem",
                        cord_two: "11.6rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.25rem",
                        cord_two: "11.6rem",
                    };
                }
            } else if (ribbonsLength > 8 && ribbonsLength <= 12) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.8rem",
                        cord_two: "11.6rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.05rem",
                        cord_two: "11.6rem",
                    };
                }
            } else if (ribbonsLength > 12 && ribbonsLength <= 16) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.6rem",
                        cord_two: "11.6rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.7rem",
                        cord_two: "11.6rem",
                    };
                }
            } else {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11.25rem",
                        cord_two: "11.6rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.45rem",
                        cord_two: "11.6rem",
                    };
                }
            }
        } else if (name === "femaleWorkingDressWhiteSummerOptional") {
            if (ribbonsLength > 4 && ribbonsLength <= 8) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.8rem",
                        cord_two: "12.6rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "8.9rem",
                        cord_two: "12.6rem",
                    };
                }
            } else if (ribbonsLength > 8 && ribbonsLength <= 12) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.6rem",
                        cord_two: "12.6rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "8.65rem",
                        cord_two: "12.6rem",
                    };
                }
            } else if (ribbonsLength > 12 && ribbonsLength <= 16) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.3rem",
                        cord_two: "12.6rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "8.4rem",
                        cord_two: "12.6rem",
                    };
                }
            } else {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10rem",
                        cord_two: "12.6rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.1rem",
                        cord_two: "12.6rem",
                    };
                }
            }
        } else if (
            name === "femaleWorkingDress3AWinter" ||
            name === "femaleWorkingDressWinterBlackModified"
        ) {
            if (ribbonsLength > 4 && ribbonsLength <= 8) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11.3rem",
                        cord_two: "11.7rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.45rem",
                        cord_two: "11.7rem",
                    };
                }
            } else if (ribbonsLength > 8 && ribbonsLength <= 12) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11.1rem",
                        cord_two: "11.7rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.25rem",
                        cord_two: "11.7rem",
                    };
                }
            } else if (ribbonsLength > 12 && ribbonsLength <= 16) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.9rem",
                        cord_two: "11.7rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.05rem",
                        cord_two: "11.7rem",
                    };
                }
            } else {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11.6rem",
                        cord_two: "11.7rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.7rem",
                        cord_two: "11.7rem",
                    };
                }
            }
        } else if (
            name === "femaleWorkingDress3AWinterOptional" ||
            name === "femaleInformalMessDressRedSeaRig" ||
            name === "femaleInformalMessDressRedSeaRigAFNS" ||
            name === "femaleWorkingDressBlackOptional"
        ) {
            let isTrue =
                name === "femaleInformalMessDressRedSeaRig" ||
                name === "femaleInformalMessDressRedSeaRigAFNS" ||
                name === "femaleWorkingDressBlackOptional";
            if (ribbonsLength > 4 && ribbonsLength <= 8) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: isTrue ? "10.05rem" : "10rem",
                        cord_two: "12.2rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.2rem",
                        cord_two: "12.2rem",
                    };
                }
            } else if (ribbonsLength > 8 && ribbonsLength <= 12) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: isTrue ? "9.75rem" : "9.8rem",
                        cord_two: "12.2rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "8.9rem",
                        cord_two: "12.2rem",
                    };
                }
            } else if (ribbonsLength > 12 && ribbonsLength <= 16) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: isTrue ? "9.45rem" : "9.6rem",
                        cord_two: "12.2rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "8.6rem",
                        cord_two: "12.2rem",
                    };
                }
            } else {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: isTrue ? "10.3rem" : "10.25rem",
                        cord_two: "12.2rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.35rem",
                        cord_two: "12.2rem",
                    };
                }
            }
        } else if (name === "femaleWorkingDress3WorkingSummer") {
            if (ribbonsLength > 4 && ribbonsLength <= 8) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.75rem",
                        cord_two: "12.4rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.95rem",
                        cord_two: "12.4rem",
                    };
                }
            } else if (ribbonsLength > 8 && ribbonsLength <= 12) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.5rem",
                        cord_two: "12.4rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.6rem",
                        cord_two: "12.4rem",
                    };
                }
            } else if (ribbonsLength > 12 && ribbonsLength <= 16) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.3rem",
                        cord_two: "12.4rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "9.4rem",
                        cord_two: "12.4rem",
                    };
                }
            } else {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11.05rem",
                        cord_two: "12.4rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.2rem",
                        cord_two: "12.4rem",
                    };
                }
            }
        } else if (name === "femaleWhiteDress3AWorkingWinter") {
            if (ribbonsLength > 4 && ribbonsLength <= 8) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11.55rem",
                        cord_two: "11.7rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.7rem",
                        cord_two: "11.7rem",
                    };
                }
            } else if (ribbonsLength > 8 && ribbonsLength <= 12) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11.4rem",
                        cord_two: "11.7rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.5rem",
                        cord_two: "11.7rem",
                    };
                }
            } else if (ribbonsLength > 12 && ribbonsLength <= 16) {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11.15rem",
                        cord_two: "11.7rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.3rem",
                        cord_two: "11.7rem",
                    };
                }
            } else {
                if (
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length < 3) ||
                    (selectedOptions?.leftPocketInsignia?.length === 0 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "11.7rem",
                        cord_two: "11.7rem",
                    };
                } else if (
                    selectedOptions?.leftPocketInsignia?.length > 1 ||
                    (selectedOptions?.leftPocketInsignia?.length === 1 &&
                        selectedOptions?.rightChest?.length === 3)
                ) {
                    return {
                        cord_one: "10.9rem",
                        cord_two: "11.7rem",
                    };
                }
            }
        }
    } else if (DressCheck?.dressCode === 7){
        if(name === "WinterCeremonialCPOsPOs" || name === "WinterCeremonialPOs" || name === "WinterCeremonialLDGSBelow"){

        }
    }
};

export const GetRibbonsBox = (name, length, gender) => {
    let DressCheck = GetCurrentDressChecks(name);
    if (DressCheck?.dressCode === 1) {
        if (length === 1) {
            return {
                cord_one: "10.45rem",
                cord_two: "10.9rem",
            };
        } else if (length === 2) {
            return {
                cord_one: "10.45rem",
                cord_two: "10.55rem",
            };
        } else if (length === 3) {
            return {
                cord_one: "10.45rem",
                cord_two: "10.1rem",
            };
        } else if (length >= 4 && length <= 16) {
            return {
                cord_one: "10.45rem",
                cord_two: "9.95rem",
            };
        }
    } else if (DressCheck?.dressCode === 3) {
        if (length === 1) {
            return {
                cord_one: name === "camoSSGNWorking_nine" ? "10.8rem" : "10.7rem",
                cord_two: "10.8rem",
            };
        } else if (length === 2) {
            return {
                cord_one: name === "camoSSGNWorking_nine" ? "10.8rem" : "10.7rem",
                cord_two: "10.45rem",
            };
        } else if (length === 3) {
            return {
                cord_one: name === "camoSSGNWorking_nine" ? "10.8rem" : "10.7rem",
                cord_two: name === "camoSSGNWorking_nine" ? "10rem" : "10.1rem",
            };
        } else if (length >= 4 && length <= 16) {
            return {
                cord_one: name === "camoSSGNWorking_nine" ? "10.8rem" : "10.7rem",
                cord_two: "9.8rem",
            };
        }
    } else if (DressCheck?.dressCode === 4) {
        if (name === "WorkingDressWhite" || name === "InformalMessDressRedSeaRig") {
            if (length === 1) {
                return {
                    cord_one: "9.8rem",
                    cord_two: "11.4rem",
                };
            } else if (length === 2) {
                return {
                    cord_one: "9.8rem",
                    cord_two: "11.1rem",
                };
            } else if (length === 3) {
                return {
                    cord_one: "9.8rem",
                    cord_two: "10.7rem",
                };
            } else if (length >= 4 && length <= 16) {
                return {
                    cord_one: "9.8rem",
                    cord_two: "10.45rem",
                };
            }
        } else if (name === "WorkingDressWhiteWinter" || name === "WorkingWinterBlackModified") {
            if (length === 1) {
                return {
                    cord_one: "10.6rem",
                    cord_two: "11rem",
                };
            } else if (length === 2) {
                return {
                    cord_one: "10.6rem",
                    cord_two: "10.7rem",
                };
            } else if (length === 3) {
                return {
                    cord_one: "10.6rem",
                    cord_two: "10.3rem",
                };
            } else if (length >= 4 && length <= 16) {
                return {
                    cord_one: "10.6rem",
                    cord_two: "10.1rem",
                };
            }
        } else if (name === "femaleWorkingDressWhiteSummer") {
            if (length === 1) {
                return {
                    cord_one: "11.6rem",
                    cord_two: "10.7rem",
                };
            } else if (length === 2) {
                return {
                    cord_one: "11.6rem",
                    cord_two: "10.4rem",
                };
            } else if (length === 3) {
                return {
                    cord_one: "11.6rem",
                    cord_two: "10rem",
                };
            } else if (length >= 4 && length <= 16) {
                return {
                    cord_one: "11.6rem",
                    cord_two: "9.8rem",
                };
            }
        } else if (name === "femaleWorkingDressWhiteSummerOptional") {
            if (length === 1) {
                return {
                    cord_one: "10.3rem",
                    cord_two: "11.65rem",
                };
            } else if (length === 2) {
                return {
                    cord_one: "10.3rem",
                    cord_two: "11.4rem",
                };
            } else if (length === 3) {
                return {
                    cord_one: "10.3rem",
                    cord_two: "11rem",
                };
            } else if (length >= 4 && length <= 16) {
                return {
                    cord_one: "10.3rem",
                    cord_two: "10.7rem",
                };
            }
        } else if (
            name === "femaleWorkingDress3AWinter" ||
            name === "femaleWorkingDressWinterBlackModified"
        ) {
            if (length === 1) {
                return {
                    cord_one: "12rem",
                    cord_two: "10.7rem",
                };
            } else if (length === 2) {
                return {
                    cord_one: "12rem",
                    cord_two: "10.4rem",
                };
            } else if (length === 3) {
                return {
                    cord_one: "12rem",
                    cord_two: "10rem",
                };
            } else if (length >= 4 && length <= 16) {
                return {
                    cord_one: "12rem",
                    cord_two: "9.8rem",
                };
            }
        }else if (
            name === "femaleDressNo8WinterWorking" ||
            name === "POfemaleDressNo8WinterWorking" ||
            name === "LDGfemaleDressNo8WinterWorking"
        ) {
            if (length === 1) {
                return {
                    cord_one: "12.2rem",
                    cord_two: "11.5rem",
                };
            } else if (length === 2) {
                return {
                    cord_one: "12.2rem",
                    cord_two: "11.1rem",
                };
            } else if (length === 3) {
                return {
                    cord_one: "12.2rem",
                    cord_two: "10.7rem",
                };
            } else if (length >= 4 && length <= 16) {
                return {
                    cord_one: "12.2rem",
                    cord_two: "10.6rem",
                };
            }
        } 
        else if (
            name === "femaleWorkingDress3AWinterOptional" ||
            name === "femaleInformalMessDressRedSeaRig" ||
            name === "femaleInformalMessDressRedSeaRigAFNS" ||
            name === "femaleWorkingDressBlackOptional"
        ) {
            if (length === 1) {
                return {
                    cord_one: "10.6rem",
                    cord_two: "11.6rem",
                };
            } else if (length === 2) {
                return {
                    cord_one: "10.6rem",
                    cord_two: "11.3rem",
                };
            } else if (length === 3) {
                return {
                    cord_one: "10.6rem",
                    cord_two: "10.5rem",
                };
            } else if (length >= 4 && length <= 16) {
                return {
                    cord_one: "10.6rem",
                    cord_two: "10.5rem",
                };
            }
        } else if (name === "femaleWorkingDress3WorkingSummer") {
            if (length === 1) {
                return {
                    cord_one: "11.35rem",
                    cord_two: "11.5rem",
                };
            } else if (length === 2) {
                return {
                    cord_one: "11.35rem",
                    cord_two: "11.3rem",
                };
            } else if (length === 3) {
                return {
                    cord_one: "11.35rem",
                    cord_two: "10.8rem",
                };
            } else if (length >= 4 && length <= 16) {
                return {
                    cord_one: "11.35rem",
                    cord_two: "10.7rem",
                };
            }
        } else if (name === "femaleWhiteDress3AWorkingWinter") {
            if (length === 1) {
                return {
                    cord_one: "12.15rem",
                    cord_two: "10.9rem",
                };
            } else if (length === 2) {
                return {
                    cord_one: "12.15rem",
                    cord_two: "10.55rem",
                };
            } else if (length === 3) {
                return {
                    cord_one: "12.15rem",
                    cord_two: "10.05rem",
                };
            } else if (length >= 4 && length <= 16) {
                return {
                    cord_one: "12.15rem",
                    cord_two: "9.87rem",
                };
            }
        } else if (name === "WorkingDressWhiteSummerCPOsPOs" || name === "WorkingDressWhiteSummerPOs" || name === "WorkingDressWhiteSummerLDGSBelow") {
            if (length === 1) {
                return {
                    cord_one: "9.8rem",
                    cord_two: "11.4rem",
                };
            } else if (length === 2) {
                return {
                    cord_one: "9.8rem",
                    cord_two: "11rem",
                };
            } else if (length === 3) {
                return {
                    cord_one: "9.8rem",
                    cord_two: "10.6rem",
                };
            } else if (length >= 4 && length <= 16) {
                return {
                    cord_one: "9.8rem",
                    cord_two: "10.4rem",
                };
            }
        } else if (name === "femaleDressNo3WorkingDressWhiteSummer" || name === "POfemaleDressNo3WorkingDressWhiteSummer" || name === "LDGfemaleDressNo3WorkingDressWhiteSummer") {
            if (length === 1) {
                return {
                    cord_one: "11.9rem",
                    cord_two: "10.7rem",
                };
            } else if (length === 2) {
                return {
                    cord_one: "11.9rem",
                    cord_two: "10.7rem",
                };
            } else if (length === 3) {
                return {
                    cord_one: "11.9rem",
                    cord_two: "10.3rem",
                };
            } else if (length >= 4 && length <= 16) {
                return {
                    cord_one: "11.9rem",
                    cord_two: "10rem",
                };
            }
        }  else if (name === "WorkingDressWhiteWinterCPOsPOs" || name === "WorkingDressWhiteWinterPOs" || name === "WorkingDressWhiteWinterLDGSBelow") {
            if (length === 1) {
                return {
                    cord_one: "10.5rem",
                    cord_two: "11.0rem",
                };
            } else if (length === 2) {
                return {
                    cord_one: "10.5rem",
                    cord_two: "10.7rem",
                };
            } else if (length === 3) {
                return {
                    cord_one: "10.5rem",
                    cord_two: "10.3rem",
                };
            } else if (length >= 4 && length <= 16) {
                return {
                    cord_one: "10.5rem",
                    cord_two: "10rem",
                };
            }
        }  else if (name === "femaleDressNo3AWorkingDressSummer" || name === "POfemaleDressNo3AWorkingDressSummer" || name === "LDGfemaleDressNo3AWorkingDressSummer") {
            if (length === 1) {
                return {
                    cord_one: "12.3rem",
                    cord_two: "11.7rem",
                };
            } else if (length === 2) {
                return {
                    cord_one: "12.3rem",
                    cord_two: "11.4rem",
                };
            } else if (length === 3) {
                return {
                    cord_one: "12.3rem",
                    cord_two: "11rem",
                };
            } else if (length >= 4 && length <= 16) {
                return {
                    cord_one: "12.3rem",
                    cord_two: "10.8rem",
                };
            }
        } else if (name === "WinterWorkingCPOsPOs" || name === "WinterWorkingPOs" || name === "WinterWorkingLDGSBelow") {
            if (length === 1) {
                return {
                    cord_one: "10.5rem",
                    cord_two: "11.0rem",
                };
            } else if (length === 2) {
                return {
                    cord_one: "10.5rem",
                    cord_two: "10.7rem",
                };
            } else if (length === 3) {
                return {
                    cord_one: "10.5rem",
                    cord_two: "10.3rem",
                };
            } else if (length >= 4 && length <= 16) {
                return {
                    cord_one: "10.5rem",
                    cord_two: "10rem",
                };
            }
        } 
        else {
            return {
                cord_one: "10.6rem",
                cord_two: "11rem",
            };
        }
    } else if (DressCheck?.dressCode === 0) {
        if (length === 1) {
            return {
                cord_one: "10.5rem",
                cord_two: "11rem",
            };
        } else if (length === 2) {
            return {
                cord_one: "10.5rem",
                cord_two: "10.7rem",
            };
        } else if (length === 3) {
            return {
                cord_one: "10.5rem",
                cord_two: "10.3rem",
            };
        } else if (length >= 4 && length <= 16) {
            return {
                cord_one: gender === "female" ? "10.9rem" : "10.5rem",
                cord_two: name === "femaleSeven" ? "10.3rem" : "10.05rem",
            };
        }
    } else if (DressCheck?.dressCode === 7) {
        if (gender === "female") {
            if (name === "femaleServiceDressBlackAFNS") {
                if (length === 1) {
                    return {
                        cord_one: "11.1rem",
                        cord_two: "11.9rem",
                    };
                } else if (length === 2) {
                    return {
                        cord_one: "11.1rem",
                        cord_two: "11.6rem",
                    };
                } else if (length === 3) {
                    return {
                        cord_one: "11.1rem",
                        cord_two: "11.2rem",
                    };
                } else if (length >= 4 && length <= 16) {
                    return {
                        cord_one: "11.1rem",
                        cord_two: "11rem",
                    };
                }
            } else if (name === "femaleServiceDressBlackWithJerseyAFNS") {
                if (length === 1) {
                    return {
                        cord_one: "12.15rem",
                        cord_two: "10.85rem",
                    };
                } else if (length === 2) {
                    return {
                        cord_one: "12.15rem",
                        cord_two: "10.55rem",
                    };
                } else if (length === 3) {
                    return {
                        cord_one: "12.15rem",
                        cord_two: "10.12rem",
                    };
                } else if (length >= 4 && length <= 16) {
                    return {
                        cord_one: "12.15rem",
                        cord_two: "9.85rem",
                    };
                }
            } else if (
                name === "femaleFullBlackWinterCeremonialDressOptional" ||
                name === "femaleServiceBlackWinterCeremonialDressOptional" ||
                name === "femaleFullBlackWinterCeremonialDressAFNS"
            ) {
                if (length === 1) {
                    return {
                        cord_one: "8.95rem",
                        cord_two: "12.3rem",
                    };
                } else if (length === 2) {
                    return {
                        cord_one: "8.95rem",
                        cord_two: "12.25rem",
                    };
                } else if (length === 3) {
                    return {
                        cord_one: "8.95rem",
                        cord_two: "12rem",
                    };
                } else if (length >= 4 && length <= 16) {
                    if (length === 4) {
                        return {
                            cord_one: "8.95rem",
                            cord_two: "11.6rem",
                        };
                    } else if (length > 4 && length <= 8) {
                        return {
                            cord_one: "9.25rem",
                            cord_two: "11.6rem",
                        };
                    } else if (length > 8 && length <= 12) {
                        return {
                            cord_one: "9.45rem",
                            cord_two: "11.6rem",
                        };
                    } else {
                        return {
                            cord_one: "9.7rem",
                            cord_two: "11.6rem",
                        };
                    }
                }
            } else {
                if (length === 1) {
                    return {
                        cord_one: "9.05rem",
                        cord_two: "12.3rem",
                    };
                } else if (length === 2) {
                    return {
                        cord_one: "9.05rem",
                        cord_two: "12.25rem",
                    };
                } else if (length === 3) {
                    return {
                        cord_one: "9.05rem",
                        cord_two: "12rem",
                    };
                } else if (length >= 4 && length <= 16) {
                    if (length === 4) {
                        return {
                            cord_one: "9.05rem",
                            cord_two: "11.6rem",
                        };
                    } else if (length > 4 && length <= 8) {
                        return {
                            cord_one: "9.25rem",
                            cord_two: "11.6rem",
                        };
                    } else if (length > 8 && length <= 12) {
                        return {
                            cord_one: "9.5rem",
                            cord_two: "11.6rem",
                        };
                    } else {
                        return {
                            cord_one: "9.8rem",
                            cord_two: "11.6rem",
                        };
                    }
                }
            }
        } else {
            if (length === 1) {
                return {
                    cord_one: "7.75rem",
                    cord_two: "12.75rem",
                };
            } else if (length === 2) {
                return {
                    cord_one: "7.75rem",
                    cord_two: "11.9rem",
                };
            } else if (length === 3) {
                return {
                    cord_one: "7.75rem",
                    cord_two: "11.45rem",
                };
            } else if (length >= 4 && length <= 16) {
                if (length === 4) {
                    return {
                        cord_one: gender === "female" ? "7.75rem" : "7.75rem",
                        cord_two: name === "femaleSeven" ? "11.4rem" : "11.4rem",
                    };
                } else if (length > 4 && length <= 8) {
                    return {
                        cord_one: gender === "female" ? "7.9rem" : "7.9rem",
                        cord_two: name === "femaleSeven" ? "11.4rem" : "11.4rem",
                    };
                } else if (length > 8 && length <= 12) {
                    return {
                        cord_one: gender === "female" ? "8.2rem" : "8.2rem",
                        cord_two: name === "femaleSeven" ? "11.4rem" : "11.4rem",
                    };
                } else {
                    return {
                        cord_one: gender === "female" ? "8.5rem" : "8.5rem",
                        cord_two: name === "femaleSeven" ? "11.4rem" : "11.4rem",
                    };
                }
            }
        }
    } else if (name === "femaleFive" || name === "femaleSeven") {
        if (length === 1) {
            return {
                cord_one: "11.6rem",
                cord_two: "11.7rem",
            };
        } else if (length === 2) {
            return {
                cord_one: "11.6rem",
                cord_two: "10.7rem",
            };
        } else if (length === 3) {
            return {
                cord_one: "11.6rem",
                cord_two: "10.5rem",
            };
        } else if (length >= 4 && length <= 16) {
            return {
                cord_one: gender === "female" ? "11.6rem" : "9.7rem",
                cord_two: name === "femaleSeven" ? "10.3rem" : "10.5rem",
            };
        }

    }  else if (name === "femaleSix" ) {
        if (length === 1) {
            return {
                cord_one: "11.6rem",
                cord_two: "11.7rem",
            };
        } else if (length === 2) {
            return {
                cord_one: "11.6rem",
                cord_two: "10.7rem",
            };
        } else if (length === 3) {
            return {
                cord_one: "11.6rem",
                cord_two: "10.5rem",
            };
        } else if (length >= 4 && length <= 16) {
            return {
                cord_one: gender === "female" ? "11.6rem" : "9.7rem",
                cord_two: name === "femaleSeven" ? "10.3rem" : "10.5rem",
            };
        }

    } 
    else {    
        
                        // change ribbon postion for CPO etc
        if (length === 1) {
            return {
                cord_one: "9.7rem",
                cord_two: "11.7rem",
            };
        } else if (length === 2) {
            return {
                cord_one: "9.7rem",
                cord_two: "10.7rem",
            };
        } else if (length === 3) {
            return {
                cord_one: "9.7rem",
                cord_two: "10.5rem",
            };
        } else if (length >= 4 && length <= 16) {
            return {
                cord_one: gender === "female" ? "10.9rem" : "9.7rem",
                cord_two: name === "femaleSeven" ? "10.3rem" : "10.5rem",
            };
        }
    }
};

export function debounce(func, delay) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

export const getInputData = (item, handleOptionClick, selectedOption) => {
    let content;
    // if (item?.id === 2 && (selectedOption[1] === "SSG" || selectedOption[1] === "MARINES")) {
    //     content = (
    //         <div
    //             className="dropdown_item flex_center"
    //             onClick={() => handleOptionClick(item?.options?.[0]?.name, item?.id)}
    //         >
    //             <p>{item?.options?.[0]?.name}</p>
    //         </div>
    //     );
    // } else
    if (item?.id === 2 && ((selectedOption[1] === "CPOs")||(selectedOption[1] === "POs")||(selectedOption[1] === "LDGs & Below")||(selectedOption[1] === "CPOs POs LDGs & Below"))) {
        content =
            item?.options &&
            item?.options?.map((option, index) => {
                return (
                    <div
                        key={index}
                        className="dropdown_item flex_center"
                        onClick={() => handleOptionClick(option.name, item?.id)}
                    >
                        <p>{option.name}</p>
                    </div>
                );
            });
    } else if (item?.id === 2 && selectedOption[1] === "AFNS") {
        content = (
            <div
                className="dropdown_item flex_center"
                onClick={() => handleOptionClick(item?.options?.[1]?.name, item?.id)}
            >
                <p>{item?.options?.[1]?.name}</p>
            </div>
        );
    } else if (item?.id === 3) {
        content =
            item?.options?.length > 0 &&
            item?.options?.map((option, index) => {
                return (
                    <div
                        key={index}
                        className="dropdown_item flex_center"
                        onClick={() => handleOptionClick(option, item?.id)}
                    >
                        <p>{option?.dressName}</p>
                    </div>
                );
            });
    } else {
        content =
            item?.options &&
            item?.options?.map((option, index) => {
                return (
                    <div
                        key={index}
                        className="dropdown_item flex_center"
                        onClick={() => handleOptionClick(option.name, item?.id)}
                    >
                        <p>{option.name}</p>
                    </div>
                );
            });
    }

    return content;
};

export const SetDressesData = (id, selectedOption, allDresses) => {
    if (id === 3) {
        return allDresses
            ?.filter((dressItem, index) => {
                if (
                    dressItem?.category.toLowerCase() === selectedOption?.[1]?.toLowerCase() &&
                    dressItem?.dressGender.toLowerCase() === selectedOption?.[2]?.toLowerCase()
                ) {
                    return true;
                } else {
                    return false;
                }
            })
            .sort((a, b) => a.sorting - b.sorting);
    }
};

export const calulateTopOfRibbons = (length, itemCords, currentRibbonLength) => {
    if (length > 4 && length <= 8) {
        return itemCords?.cord_top_two;
    } else if (length > 8 && length <= 12) {
        return itemCords?.cord_top_three;
    } else if (length > 12 && length <= 16) {
        return itemCords?.cord_one;
    } else {
        return currentRibbonLength === 0 ? itemCords?.cord_one : itemCords?.cord_top_one;
    }
};

// chanigg cod oto poush

export const UpdatedTitles = (index, item, DressCheck, hoverData, selectedOptions, compKey) => {
    let findHoverData = hoverData?.find((item) => item?.holderName === compKey);
    console.log("findHoverData", findHoverData);
    if (compKey === "leftPocket" && selectedOptions?.leftPocketInsignia?.length > 1) {
        if (index === 0) {
            return `${item?.name}  ${findHoverData?.title_two}  ${
                selectedOptions?.leftPocketInsignia?.[index + 1]?.name
            }`;
        } else {
            return `${item?.name}  ${findHoverData?.title_one}`;
        }
    } else if (compKey === "rightChest") {
        if (selectedOptions?.leftPocketInsignia?.length === 3) {
            return `${item?.name}  ${findHoverData?.title_two}  ${selectedOptions?.leftPocketInsignia?.[2]?.name}`;
        } else if (
            selectedOptions?.leftPocketInsignia?.length < 3 &&
            selectedOptions?.rightChest?.length > 1 &&
            index === 0
        ) {
            let isIndex = selectedOptions?.rightChest?.length === 3 ? 2 : 1;
            return `${item?.name}  ${findHoverData?.title_two}  ${
                selectedOptions?.rightChest?.[index + isIndex]?.name
            }`;
        } else {
            return `${item?.name}  ${findHoverData?.title_one}`;
        }
    } else if (compKey === "rightPocket") {
        if (selectedOptions?.rightPocketInsignia?.length === 2) {
            return `${item?.name}  ${findHoverData?.title_one}`;
        } else if (selectedOptions?.rightPocketInsignia?.length === 3) {
            if (index === 1) {
                return `${item?.name}  ${findHoverData?.title_two}`;
            } else {
                return `${item?.name}  ${findHoverData?.title_one}`;
            }
        } else {
            return `${item?.name}  ${findHoverData?.title_one}`;
        }
    } else if (compKey === "leftChest") {
        if (selectedOptions?.leftChest?.length === 2) {
            return `${item?.name}  ${findHoverData?.title_one}`;
        } else if (selectedOptions?.leftChest?.length === 3) {
            if (index === 1) {
                return `${item?.name}  ${findHoverData?.title_two}`;
            } else {
                return `${item?.name}  ${findHoverData?.title_one}`;
            }
        } else {
            return `${item?.name}  ${findHoverData?.title_two}`;
        }
    }else if(compKey === "Ranks"){
        return `${item?.name}  ${findHoverData?.title_right}`;
    }else {
        return `${item?.name}  ${findHoverData?.title_one}`;
    }
};
// updatedCode

export const UpdatedDataToShow = (DressCheck, rightChest, leftPocketInsg) => {
    if (DressCheck?.dressCode === 2 || DressCheck?.dressCode === 3) {
        if (rightChest?.length === 1 && leftPocketInsg?.length === 1) {
            return [];
        } else if (
            (rightChest?.length === 2 && leftPocketInsg?.length === 1) ||
            (rightChest?.length === 2 && leftPocketInsg?.length === 3) ||
            (rightChest?.length === 3 && leftPocketInsg?.length === 3)
        ) {
            return [rightChest?.[1]];
        } else if (rightChest?.length === 3) {
            return rightChest?.slice(1);
        } else {
            return rightChest;
        }
    } else if (DressCheck?.dressCode === 4) {
        if (rightChest?.length > 2 && leftPocketInsg?.length < 3) {
            return rightChest.slice(1);
        } else if (rightChest?.length > 0 && leftPocketInsg?.length > 2) {
            return [rightChest?.[rightChest?.length - 1]];
        } else {
            return rightChest;
        }
    } else {
        return rightChest;
    }
};

export const GetNeckMedalsCord = (name) => {
    if (
        name === "female_one" ||
        name === "female_three" ||
        name === "femaleMessDressSummerMessKit"
    ) {
        return { cord_one: "8.5rem", cord_two: "9.45rem" };
    } else if (name === "femaleMessDressBlackWinterMessKit") {
        return { cord_one: "9.15rem", cord_two: "9.45rem" };
    } else if (name === "MessDressWhiteSummerMessKit" || name === "MessDressBlackWinterMessKit") {
        return { cord_one: "8.1rem", cord_two: "9.45rem" };
    } else if (name === "FullBlackWinterCeremonialDress") {
        return { cord_one: "7.8rem", cord_two: "9.45rem" };
    } else if (
        name === "femaleFullBlackWinterCeremonialDress" ||
        name === "femaleFullBlackWinterCeremonialDressOptional"
    ) {
        return { cord_one: "8.9rem", cord_two: "9.45rem" };
    } else {
        return { cord_one: "7.1rem", cord_two: "9.45rem" };
    }
};
export const GetLeftBicepCord = (name) => {
    if (
        name === "CeremonialSummerForCPOSANDPOS" ||
        name === "female_three" ||
        name === "femaleMessDressSummerMessKit"
    ) {
        return { cord_one: "8.5rem", cord_two: "9.45rem" };
    } else if (name === "femaleMessDressBlackWinterMessKit") {
        return { cord_one: "9.15rem", cord_two: "9.45rem" };
    } else if (name === "MessDressWhiteSummerMessKit" || name === "MessDressBlackWinterMessKit") {
        return { cord_one: "8.1rem", cord_two: "9.45rem" };
    } else if (name === "FullBlackWinterCeremonialDress") {
        return { cord_one: "7.8rem", cord_two: "9.45rem" };
    } else if (
        name === "femaleFullBlackWinterCeremonialDress" ||
        name === "femaleFullBlackWinterCeremonialDressOptional"
    ) {
        return { cord_one: "8.9rem", cord_two: "9.45rem" };
    } else {
        return { cord_one: "7.1rem", cord_two: "9.45rem" };
    }
};
export const GetScrafCord = (name) => {
    if (
        name === "CeremonialSummerForCPOSANDPOS" || name === "SSGNCamouflageCeremonialCPOs" ||
        name === "female_three" ||
        name === "femaleMessDressSummerMessKit"
    ) {
        return { cord_one: "8.5rem", cord_two: "9.45rem" };
    } else if (name === "femaleMessDressBlackWinterMessKit") {
        return { cord_one: "9.15rem", cord_two: "9.45rem" };
    } else if (name === "MessDressWhiteSummerMessKit" || name === "MessDressBlackWinterMessKit") {
        return { cord_one: "8.1rem", cord_two: "9.45rem" };
    } else if (name === "FullBlackWinterCeremonialDress") {
        return { cord_one: "7.8rem", cord_two: "9.45rem" };
    } else if (
        name === "femaleFullBlackWinterCeremonialDress" ||
        name === "femaleFullBlackWinterCeremonialDressOptional"
    ) {
        return { cord_one: "8.9rem", cord_two: "9.45rem" };
    } else {
        return { cord_one: "7.1rem", cord_two: "9.45rem" };
    }
};
export const CurrentScraf = (name, array, DressCheck) => {
    if (DressCheck?.dressCode === 1) {
        return {
            top: "7.5rem",
            left: "7.75rem",
            gap: "0rem",
        };
        
    } else if (DressCheck?.dressCode === 2) {
        return {
            top: "7.5rem",
            left: "8.75rem",
            gap: "0rem",
        };
        
    } 
    else if (DressCheck?.dressCode === 3) {
        return {
            top: "9.5rem",
            left: "15.75rem",
            gap: "0rem",
        };
        
    } 
    else if (DressCheck?.dressCode === 4) {
        return {
            top: "9.5rem",
            left: "7.75rem",
            gap: "0rem",
        };
        
    } 
    else {
        if(name === "SSGNCamouflageCeremonialCPOs"  ){
            return {
                top: "-2.8rem",
                left: "-2.6rem",
                gap: "0rem",
            };
        }else if( name === "SSGNCamouflageCeremonialPOs" || name === "SSGNCamouflageCeremonialLDGSBelow" || name === "camoSSGN_seven" || name === "PakMarineCeremonialCPOs" || name === "PakMarineCeremonialPOs" || name === "PakMarineCeremonialLDGSBelow" || name === "camoPakMarines_six"){
            return {
                top: "-1.4rem",
                left: "-2.6rem",
                gap: "0rem",
            };
        }
        else if(name === "CeremonialSummerForCPOSANDPOS"  ){
            return {
                top: "-3.38rem",
                left: "-2.6rem",
                gap: "0rem",
            };
        }
        else if(name === "CeremonialSummerForPOS"|| name === "CeremonialSummerForLDGSAndBelow"){
            return {
                top: "-1.9rem",
                left: "-2.6rem",
                gap: "0rem",
            };
        }
        else if(name === "WinterCeremonialCPOsPOs"|| name === "WinterCeremonialPOs" || name === "WinterCeremonialLDGSBelow"){
            return {
                top: "-1.5rem",
                left: "-2.6rem",
                gap: "0rem",
            };
        }
        
    }
};
