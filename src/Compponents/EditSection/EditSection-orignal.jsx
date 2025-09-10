import { Box, Container, List, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { CustomListItem, CustomPageBtn } from "../../muiStyles";

import BadgeModel from "./BadgeModel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import bgArmy from "../../assets/bg.png";
import {
    BoxPositions,
    Caps,
    LeftBiceps,
    LeftChest,
    LeftPocket,
    Medals,
    pdfs,
    Ranks,
    Ribbons,
    RightBiceps,
    RightChest,
    RightPocket,
    
} from "../../utils/utils";
import {
    CurrentBoxPosition,
    GetBadgesLength,
    GetCurrentBadge,
    GetCurrentCaps,
    GetCurrentDressChecks,
    GetCurrentUpdatedData,
    GetLeftChestCord,
    GetNeckMedalsCord,
    getResponsiveLength,
    GetRibbonsBox,
    GetRightBoxCord,
    GetLeftBicepCord,
    IsBadgeAvailable,
    IsShowPET,
    LimitString,
    makeDeepCopy,
    MoveToFront,
    SelectedCap,
    SetBadgeTitles,
    IsMultiRankAllowed
} from "../../utils/logics";
import { useDispatch, useSelector } from "react-redux";
import pakFlag from "../../assets/flag.png";
import ReactPortal from "../Portal/ReactPortal";
import NameModel from "../Models/NameModel";
import { toast } from "react-toastify";
import { setCurrentDresses, setDefaultState } from "../../store/DressesSlice/dressesSlice";
import RibbonModel from "../Models/RibbonModel";
import LeftPocketContent from "./LeftPocket";
import LeftChestContent from "./LeftChest";
import SoftNameTally from "./SoftNameTally";
import RightBicepContent from "./RightBicepContent";
import LeftBicepContent from "./LeftBicepContent";
import RightPocketContent from "./RightPocketContent";
import RightChestContent from "./RightChestContent";
import ShowExtraImage from "./ShowExtraImage";
import MessNameTally from "./MessNameTally";
import PdfModel from "../Models/PdfModel";
import MedalsContent from "./MedalsContent";
import GoldButtons from "./GoldButtons";
import BeltStars from "./BeltStars";
import NeckMedals from "./NeckMedals";
import LeftArmContent from "./ArmLeftBiceps";

const editHeaderMenu = [
    {
        tabNum: 1,
        tabNam: "Ribbons",
    },
    {
        tabNum: 9,
        tabNam: "Medals",
    },
    {
        tabNum: 2,
        tabNam: "Caps",
    },
    {
        tabNum: 3,
        tabNam: "Ranks",
    },
    {
        tabNum: 6,
        tabNam: "Right Chest",
    },

    {
        tabNum: 4,
        tabNam: "Right Pocket",
    },
    {
        tabNum: 5,
        tabNam: "Left Chest",
    },

    {
        tabNum: 7,
        tabNam: "Left Pocket",
    },
    {
        tabNum: 8,
        tabNam: "Right Bicep",
    },
    {
        tabNum: 10,
        tabNam: "Left Bicep",
    },
    
];

const EditSection = () => {
    const [currentTab, setCurrentTab] = useState(1);
    const [sizeModel, setSizeModel] = useState({
        isShow: false,
        sizeImage_one: null,
        sizeImage_two: null,
    });
    const { currentDresses, allDresses, maleDresses, femaleDresses, defaultState } = useSelector(
        (state) => state.dresses
    );

    const dispatch = useDispatch();

    const [selectedOptions, setSelectedOptions] = useState({
        ribbon: [],
        cap: [],
        rank: [],
        rightPocketInsignia: [],
        leftPocketInsignia: [],
        rightChest: [],
        rightBiceps: [],
        armLeftBiceps:[],
        leftChest: [],
        Medals: [],
        neckMedals: [],
        showNameTallyModel: false,
        showPdfModel: false,
        NameTally: "",
    });

    const [selectedInsiginas, setSelectedInsiginas] = useState({
        leftChest: [],
        rightChest: [],
        leftPocketInsignia: [],
        rightPocketInsignia: [],
    });
    console.log("selected Insiginas", selectedInsiginas);
    useEffect(() => {
        if (defaultState) {
            setSelectedOptions({
                ribbon: [],
                cap: [],
                rank: [],
                rightPocketInsignia: [],
                leftPocketInsignia: [],
                rightChest: [],
                leftChest: [],
                Medals: [],
                neckMedals: [],
                rightBiceps: [],
                leftArmbiceps: [],
                showNameTallyModel: false,
                NameTally: "",
            });

            dispatch(setDefaultState(false));
        }
    }, [defaultState, dispatch]);
    // let boxCords = GetBoxCoordinates(DressesBoxCordinates);
    const [itemslength, setItemsLength] = useState(getResponsiveLength(window.innerWidth));

    useEffect(() => {
        const handleResize = () => {
            setItemsLength(getResponsiveLength(window.innerWidth));
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!currentDresses) {
            dispatch(setCurrentDresses(maleDresses?.[0]));
        }
    }, [currentDresses, maleDresses, femaleDresses, dispatch]);

    let DressCheck = GetCurrentDressChecks(currentDresses?.keyName);

    // useEffect(() => {
    //     if (currentDresses?.dressGender === "female") {
    //         setSelectedOptions((prev) => {
    //             return {
    //                 ...prev,
    //                 cap: "caps5",
    //             };
    //         });
    //     } else {
    //         setSelectedOptions((prev) => {
    //             return {
    //                 ...prev,
    //                 cap: "caps1",
    //             };
    //         });
    //     }
    // }, [currentDresses?.keyName, currentDresses?.dressGender]);

    const [currentBadgesState, setCurrentBadgesState] = useState({
        loading: false,
        ribbon: [],
        cap: [],
        rank: [],
        rightPocketInsignia: [],
        leftPocketInsignia: [],
        rightChest: [],
        rightBiceps: [],
        leftChest: [],
        leftArmbiceps: [],
        Medals: [],
        pdfs: [],
    });
    const [positions, setPositions] = useState({
        rightBox: {},
        leftChest: {},
        ribbonsChest: {},
        neckMedalCords: {},
        leftbicepCords: {},

    });

    let IsPETBadgeShow = IsShowPET(selectedOptions?.leftChest);
    console.log("selectedOptions", selectedOptions);
    console.log("currentDresses", currentDresses);
    console.log("currentBadgesState", currentBadgesState);

    const [currentPage, setCurrentPage] = useState(1);

    const handleUpdateBadges = useCallback(() => {
        setCurrentBadgesState((prev) => {
            return {
                ...prev,
                loading: true,
            };
        });
        ///set all badges state

        setCurrentBadgesState((prev) => {
            let updatedCaps;
            if (currentDresses?.dressGender === "female") {
                updatedCaps = GetCurrentUpdatedData(Caps, currentDresses?.keyName);
            } else {
                updatedCaps = Caps?.filter((item) => {
                    let isAvailable = GetCurrentCaps(item, currentDresses?.keyName);
                    return isAvailable;
                });
            }

            /////ranks settings
            let updatedRanks = Ranks?.filter((item) => {
                let isAvailable = IsBadgeAvailable(item, currentDresses?.keyName);
                let rankAvailable = SelectedCap(item, selectedOptions);
                if (selectedOptions?.cap?.length > 0) {
                    return isAvailable && rankAvailable;
                } else {
                    return isAvailable;
                }
            });
            let updatedRibbons = GetCurrentUpdatedData(Ribbons, currentDresses?.keyName);
            let updatedRightPocket = GetCurrentUpdatedData(RightPocket, currentDresses?.keyName);
            let updatedLeftPocket = GetCurrentUpdatedData(LeftChest, currentDresses?.keyName);
            let updatedRightChest = GetCurrentUpdatedData(RightChest, currentDresses?.keyName);
            let updatedLeftChest = GetCurrentUpdatedData(LeftPocket, currentDresses?.keyName);
            let updatedRightBiceps = GetCurrentUpdatedData(RightBiceps, currentDresses?.keyName);
            let updatedleftArmBiceps = GetCurrentUpdatedData(LeftBiceps, currentDresses?.keyName);
            let updatedMedals = GetCurrentUpdatedData(Medals, currentDresses?.keyName);
            let updatedPdfs = GetCurrentUpdatedData(pdfs, currentDresses?.keyName);

            return {
                ...prev,
                ribbon: updatedRibbons,
                cap: updatedCaps,
                rank: updatedRanks,
                rightPocketInsignia: updatedRightPocket,
                rightChest: updatedRightChest,
                leftPocketInsignia: updatedLeftPocket,
                leftChest: updatedLeftChest,
                rightBiceps: updatedRightBiceps,
                leftArmbiceps: updatedleftArmBiceps,
                Medals: updatedMedals,
                pdfs: updatedPdfs,
            };
        });

        setCurrentBadgesState((prev) => {
            return {
                ...prev,
                loading: false,
            };
        });
    }, [
        currentDresses?.keyName,
        currentDresses?.dressGender,
        selectedOptions,
        setCurrentBadgesState,
    ]);

    useEffect(() => {
        if (currentTab === 2) {
            if (currentDresses?.dressGender === "female") {
                let updatedData = Caps?.filter((item) => {
                    let isAvailable = GetCurrentCaps(item, currentDresses?.keyName);
                    return isAvailable;
                });
                setCurrentBadgesState((prev) => {
                    return {
                        ...prev,
                        cap: updatedData,
                    };
                });
            } else {
                let updatedData = Caps?.filter((item) => {
                    let isAvailable = GetCurrentCaps(item, currentDresses?.keyName);
                    return isAvailable;
                });
                setCurrentBadgesState((prev) => {
                    return {
                        ...prev,
                        cap: updatedData,
                    };
                });
            }
        }
    }, [currentDresses?.dressGender, currentDresses?.keyName, currentTab]);

    useEffect(() => {
        setCurrentPage(1);
    }, [currentTab]);

    const ToggleOptions = (item) => {
        setSelectedOptions((prev) => {
            let prevStateData = makeDeepCopy(prev?.[item?.identity]);
            if (
                prevStateData?.find((prevStateItem) => prevStateItem?.badgeKey === item?.badgeKey)
            ) {
                return {
                    ...prev,
                    [item?.identity]: [],
                };
            } else {
                return {
                    ...prev,
                    [item?.identity]: [item],
                };
            }
        });
    };

    const ToggleRank = (item) => {
        const allowMultiple = IsMultiRankAllowed(currentDresses?.keyName);
    
        setSelectedOptions((prev) => {
            let prevRanks = makeDeepCopy(prev?.rank);
    
            const alreadySelected = prevRanks?.find(r => r.badgeKey === item.badgeKey);
    
            if (allowMultiple) {
                if (alreadySelected) {
                    return {
                        ...prev,
                        rank: prevRanks.filter(r => r.badgeKey !== item.badgeKey)
                    };
                } else {
                    return {
                        ...prev,
                        rank: [...prevRanks, item]
                    };
                }
            } else {
                // Single selection logic
                return {
                    ...prev,
                    rank: alreadySelected ? [] : [item]
                };
            }
        });
    };
    
    let getCurrentPosition = CurrentBoxPosition(BoxPositions, currentDresses?.keyName);
    const ToggleLeftChestAbove = (item) => {
        let DressCheck = GetCurrentDressChecks(currentDresses?.keyName);

        if (
            DressCheck?.dressCode === 1 ||
            DressCheck?.dressCode === 2 ||
            DressCheck?.dressCode === 3 ||
            DressCheck?.dressCode === 4
        ) {
            setSelectedOptions((prev) => {
                let update = makeDeepCopy(prev?.leftPocketInsignia);
                const existingItemIndex = prev?.leftPocketInsignia?.findIndex(
                    (i) => i?.badgeKey === item?.badgeKey
                );
                if (existingItemIndex !== -1) {
                    let filteredData = update?.filter((i) => i?.badgeKey !== item?.badgeKey);
                    return {
                        ...prev,
                        leftPocketInsignia: filteredData,
                    };
                } else {
                    if (update?.length === 3) {
                        toast.warn("Select 3 Insiginias only");
                        return prev;
                    } else {
                        return {
                            ...prev,
                            leftPocketInsignia: [...update, item],
                        };
                    }
                }
            });

            // SetBadgeTitles(setSelectedInsiginas, item, true);
        } else {
            setSelectedOptions((prevItems) => {
                let updateData = makeDeepCopy(prevItems?.leftPocketInsignia);

                if (updateData?.find((stateItem) => stateItem?.badgeKey === item?.badgeKey)) {
                    updateData = [];
                } else {
                    updateData = [item];
                }
                return {
                    ...prevItems,
                    leftPocketInsignia: updateData,
                };
            });
            // SetBadgeTitles(setSelectedInsiginas, item, false);
        }
    };

    const ToggleLeftChest = (item) => {
        let DressCheck = GetCurrentDressChecks(currentDresses?.keyName);
        let badgesLength = GetBadgesLength(currentDresses, item);
        if (
            DressCheck?.dressCode === 1 ||
            DressCheck?.dressCode === 3 ||
            DressCheck?.dressCode === 4
        ) {
            setSelectedOptions((prevItems) => {
                let leftChestArray = makeDeepCopy(prevItems?.leftChest);
                const existingItemIndex = leftChestArray?.findIndex(
                    (i) => i?.badgeKey === item?.badgeKey
                );
                const existingSeniorityIndex = leftChestArray?.findIndex(
                    (i) => i?.seniority === item?.seniority
                );

                console.log(
                    "check the find index value",
                    existingItemIndex,
                    existingSeniorityIndex
                );

                let isAllHaveStar = leftChestArray?.every((i) => i?.star);

                let checkStar = leftChestArray?.find(
                    (starItem) =>
                        starItem?.badgeKey === "leftChest17" || starItem?.badgeKey === "leftChest18"
                );

                if (existingItemIndex !== -1) {
                    leftChestArray = leftChestArray?.filter((i) => i.badgeKey !== item.badgeKey);
                } else if (existingSeniorityIndex !== -1) {
                    // if (!isAllHaveStar) {
                    //     toast.warn("Star worn only on PNWC/ND/War");
                    //     return prevItems;
                    // } else {
                    // }
                    leftChestArray[existingSeniorityIndex] = item;
                } else {
                    if (leftChestArray?.length >= badgesLength) {
                        toast.warn(
                            leftChestArray?.length === 4
                                ? `Select ${leftChestArray?.length} Insignias Only  `
                                : `Select ${badgesLength} Insignias Only`
                        );
                        return prevItems;
                    }
                    //  else if (!item.star && checkStar) {
                    //     toast.warn("Star worn only on PNWC/ND/War");
                    //     return prevItems;
                    // }
                    else {
                        leftChestArray.push(item);
                    }
                }
                leftChestArray?.sort((a, b) => a?.seniority - b?.seniority);

                const newState = {
                    ...prevItems,
                    leftChest: leftChestArray,
                };
                return newState;
            });
        }
    };

    const ToggleLeftArmBicep = (item) => {
        let DressCheck = GetCurrentDressChecks(currentDresses?.keyName);
        let badgesLength = GetBadgesLength(currentDresses, item);
        if (
            DressCheck?.dressCode === 1 ||
            DressCheck?.dressCode === 3 ||
            DressCheck?.dressCode === 4
        ) {
            setSelectedOptions((prevItems) => {
                let leftChestArray = makeDeepCopy(prevItems?.leftChest);
                const existingItemIndex = leftChestArray?.findIndex(
                    (i) => i?.badgeKey === item?.badgeKey
                );
                const existingSeniorityIndex = leftChestArray?.findIndex(
                    (i) => i?.seniority === item?.seniority
                );

                console.log(
                    "check the find index value",
                    existingItemIndex,
                    existingSeniorityIndex
                );

                let isAllHaveStar = leftChestArray?.every((i) => i?.star);

                let checkStar = leftChestArray?.find(
                    (starItem) =>
                        starItem?.badgeKey === "leftChest17" || starItem?.badgeKey === "leftChest18"
                );

                if (existingItemIndex !== -1) {
                    leftChestArray = leftChestArray?.filter((i) => i.badgeKey !== item.badgeKey);
                } else if (existingSeniorityIndex !== -1) {
                    // if (!isAllHaveStar) {
                    //     toast.warn("Star worn only on PNWC/ND/War");
                    //     return prevItems;
                    // } else {
                    // }
                    leftChestArray[existingSeniorityIndex] = item;
                } else {
                    if (leftChestArray?.length >= badgesLength) {
                        toast.warn(
                            leftChestArray?.length === 4
                                ? `Select ${leftChestArray?.length} Insignias Only  `
                                : `Select ${badgesLength} Insignias Only`
                        );
                        return prevItems;
                    }
                    //  else if (!item.star && checkStar) {
                    //     toast.warn("Star worn only on PNWC/ND/War");
                    //     return prevItems;
                    // }
                    else {
                        leftChestArray.push(item);
                    }
                }
                leftChestArray?.sort((a, b) => a?.seniority - b?.seniority);

                const newState = {
                    ...prevItems,
                    leftChest: leftChestArray,
                };
                return newState;
            });
        }
    };

    const ToggleMedals = (item) => {
        let DressCheck = GetCurrentDressChecks(currentDresses?.keyName);
        setSelectedOptions((prevItems) => {
            const existingItemIndex = prevItems?.Medals?.findIndex(
                (i) => i?.badgeKey === item?.badgeKey
            );
            const neckExistingItemIndex = prevItems?.neckMedals?.findIndex(
                (i) => i?.badgeKey === item?.badgeKey
            );

            let MedalsArray = makeDeepCopy(prevItems?.Medals);
            let neckMedalsArray = makeDeepCopy(prevItems?.neckMedals);

            if (existingItemIndex !== -1) {
                MedalsArray = MedalsArray?.filter((i) => i.badgeKey !== item.badgeKey);
            } else if (neckExistingItemIndex !== -1) {
                neckMedalsArray = neckMedalsArray?.filter((i) => i.badgeKey !== item.badgeKey);
            } else {
                if (
                    (MedalsArray?.length >= 7 && !item?.neckMedal) ||
                    (neckMedalsArray?.length >= 2 && item?.neckMedal)
                ) {
                    toast.warn("Select 9 medals only");
                    return prevItems;
                } else {
                    if (item?.neckMedal) {
                        neckMedalsArray.push(item);
                    } else {
                        MedalsArray.push(item);
                    }
                }
            }
            MedalsArray?.sort((a, b) => a?.seniority - b?.seniority);
            neckMedalsArray?.sort((a, b) => a?.seniority - b?.seniority);

            const newState = {
                ...prevItems,
                Medals: MedalsArray,
                neckMedals: neckMedalsArray,
            };
            return newState;
        });
    };

    const handleRibbonClick = (item) => {
        setSelectedOptions((prevItems) => {
            let chestRibbonsArray = makeDeepCopy(prevItems?.ribbon || []);
            const existingItemIndex = chestRibbonsArray.findIndex(
                (i) => i?.badgeKey === item?.badgeKey
            );

            if (existingItemIndex !== -1) {
                chestRibbonsArray.splice(existingItemIndex, 1);
            } else {
                if (chestRibbonsArray.length >= 16) {
                    toast.warn("Select 16 ribbons only");
                    return prevItems;
                }
                chestRibbonsArray.push(item);
            }
            chestRibbonsArray.sort((a, b) => a.id - b.id);

            // const isPakistanWear = chestRibbonsArray.find((i) => i?.badgeKey === "ribbons0");
            // const isSalgirahWear = chestRibbonsArray.find((i) => i?.badgeKey === "ribbons56");

            // if (isPakistanWear && isSalgirahWear) {
            //     chestRibbonsArray = MoveToFront(chestRibbonsArray, isSalgirahWear);
            // } else if (
            //     isPakistanWear &&
            //     existingItemIndex === -1 &&
            //     item?.badgeKey === "ribbons56"
            // ) {
            //     chestRibbonsArray = MoveToFront(chestRibbonsArray, item);
            // }
            return {
                ...prevItems,
                ribbon: chestRibbonsArray,
            };
        });
    };

    // const handleRibbonClick = (item) => {
    //     setSelectedOptions((prevItems) => {
    //         let chestRibbonsArray = makeDeepCopy(prevItems?.ribbon || []);

    //         const existingItemIndex = chestRibbonsArray.findIndex(
    //             (i) => i?.badgeKey === item?.badgeKey
    //         );

    //         if (existingItemIndex !== -1) {
    //             chestRibbonsArray = chestRibbonsArray.filter((i) => i.badgeKey !== item.badgeKey);
    //             chestRibbonsArray = chestRibbonsArray.sort((a, b) => a.id - b.id);
    //         } else {
    //             if (chestRibbonsArray.length === 16) {
    //                 toast.warn("Select 16 ribbons only");
    //                 return prevItems;
    //             } else {
    //                 chestRibbonsArray.push(item);
    //             }
    //             chestRibbonsArray = chestRibbonsArray.sort((a, b) => a.id - b.id);
    //             let isPakistanWear = chestRibbonsArray?.find((i) => i?.badgeKey == "ribbons0");
    //             let isSalgirahWear = chestRibbonsArray?.find((i2) => {
    //                 return i2?.badgeKey == "ribbons56" || item?.badgeKey == "ribbons56";
    //             });
    //             console.log("salgiuragaajajaajh", isSalgirahWear);
    //             console.log("isPakistanWear", isSalgirahWear);
    //             if (isPakistanWear && isSalgirahWear) {
    //                 chestRibbonsArray = MoveToFront(chestRibbonsArray, isSalgirahWear);
    //             }
    //         }

    //         return {
    //             ...prevItems,
    //             ribbon: chestRibbonsArray,
    //         };
    //     });
    // };

    const ToggleRightBicep = (item) => {
        setSelectedOptions((prevItems) => {
            const existingItemIndex = prevItems?.rightBiceps?.findIndex(
                (i) => i?.badgeKey === item?.badgeKey
            );

            let rightBicepsArray = makeDeepCopy(prevItems?.rightBiceps);

            if (existingItemIndex !== -1) {
                rightBicepsArray = rightBicepsArray?.filter((i) => i.badgeKey !== item.badgeKey);
            } else {
                if (rightBicepsArray?.length === 2) {
                    toast.warn("Select 2 Insignias Only");
                    return prevItems;
                } else {
                    rightBicepsArray.push(item);
                }
            }
            rightBicepsArray?.sort((a, b) => a.id - b.id);
            const newState = {
                ...prevItems,
                rightBiceps: rightBicepsArray,
            };
            return newState;
        });
    };

    const ToggleRightPocket = (item) => {
        let DressCheck = GetCurrentDressChecks(currentDresses?.keyName);
        if (DressCheck?.dressCode === 3 || DressCheck?.dressCode === 4) {
            setSelectedOptions((prevItems) => {
                const existingItemIndex = prevItems?.rightPocketInsignia?.findIndex(
                    (i) => i?.badgeKey === item?.badgeKey
                );

                let rightPocketArray = makeDeepCopy(prevItems?.rightPocketInsignia);

                if (existingItemIndex !== -1) {
                    rightPocketArray = rightPocketArray?.filter(
                        (i) => i.badgeKey !== item.badgeKey
                    );
                } else {
                    if (rightPocketArray?.length === 3) {
                        toast.warn("Select 3 Insiginas Only");
                        return prevItems;
                    } else {
                        rightPocketArray.push(item);
                    }
                }
                rightPocketArray?.sort((a, b) => a?.seniority - b?.seniority);

                const newState = {
                    ...prevItems,
                    rightPocketInsignia: rightPocketArray,
                };
                return newState;
            });
        } else {
            setSelectedOptions((prevItems) => {
                let updateData = makeDeepCopy(prevItems?.rightPocketInsignia);

                if (updateData?.find((stateItem) => stateItem?.badgeKey === item.badgeKey)) {
                    updateData = [];
                } else {
                    updateData = [item];
                }
                return {
                    ...prevItems,
                    rightPocketInsignia: updateData,
                };
            });
        }
    };
    const ToggleRightChest = (item) => {
        let DressCheck = GetCurrentDressChecks(currentDresses?.keyName);
        if (
            DressCheck?.dressCode === 2 ||
            DressCheck?.dressCode === 3 ||
            DressCheck?.dressCode === 4
        ) {
            setSelectedOptions((prevItems) => {
                const existingItemIndex = prevItems?.rightChest?.findIndex(
                    (i) => i?.badgeKey === item?.badgeKey
                );

                let rightChestArray = makeDeepCopy(prevItems?.rightChest);

                if (existingItemIndex !== -1) {
                    rightChestArray = rightChestArray?.filter((i) => i.badgeKey !== item.badgeKey);
                } else {
                    if (rightChestArray?.length === 3) {
                        toast.warn("Select 3 Insiginas Only");
                        return prevItems;
                    } else {
                        rightChestArray.push(item);
                    }
                }
                rightChestArray.sort((a, b) => b.seniority - a.seniority);
                const newState = {
                    ...prevItems,
                    rightChest: rightChestArray,
                };
                return newState;
            });
            // SetBadgeTitles(setSelectedInsiginas, item, true);
        } else {
            setSelectedOptions((prevItems) => {
                let updateData = makeDeepCopy(prevItems?.rightChest);

                if (updateData?.find((stateItem) => stateItem?.badgeKey === item.badgeKey)) {
                    updateData = [];
                } else {
                    updateData = [item];
                }
                return {
                    ...prevItems,
                    rightChest: updateData,
                };
            });
            // SetBadgeTitles(setSelectedInsiginas, item, false);
        }
        // SetBadgeTitles(setSelectedInsiginas, item, selectedOptions?.rightChest?.length);
    };

    const handleSetTabData = (tab) => {
        setCurrentTab(tab);
    };

    useEffect(() => {
        handleUpdateBadges();
    }, [handleUpdateBadges]);

    // Function to get items for the current page
    const getCurrentPageItems = () => {
        let data = [];
        if (currentTab === 1) {
            data = currentBadgesState?.ribbon;
        } else if (currentTab === 2) {
            data = currentBadgesState?.cap;
        } else if (currentTab === 3) {
            data = currentBadgesState?.rank;
        } else if (currentTab === 4) {
            data = currentBadgesState?.rightPocketInsignia;
        } else if (currentTab === 5) {
            data = currentBadgesState?.leftPocketInsignia;
        } else if (currentTab === 6) {
            data = currentBadgesState?.rightChest;
        } else if (currentTab === 7) {
            data = currentBadgesState?.leftChest;
        } else if (currentTab === 8) {
            data = currentBadgesState?.rightBiceps;
        } else if (currentTab === 9) {
            data = currentBadgesState?.Medals;
        } else if (currentTab === 10) {
            data = currentBadgesState?.leftArmbiceps;
        }
        return data;
    };

    const itemPerPage = itemslength;
    let data = getCurrentPageItems();
    let TotalItems = data.length;
    let totalPages = Math.ceil(TotalItems / itemPerPage);
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        let rightCords = GetRightBoxCord(currentDresses, selectedOptions);
        let leftChest = GetLeftChestCord(
            currentDresses,
            selectedOptions?.Medals,
            currentBadgesState?.Medals
        );
        
        if (rightCords) {
            setPositions((prev) => {
                return {
                    ...prev,
                    rightBox: rightCords,
                    leftChest: leftChest,
                };
            });
        }
    }, [
        selectedOptions?.leftPocketInsignia?.length,
        currentDresses,
        selectedOptions?.rightChest,
        selectedOptions?.leftChest,
        selectedOptions?.Medals,
        currentBadgesState?.Medals,
    ]);
    useEffect(() => {
        let ribbonsCords = GetRibbonsBox(
            currentDresses?.keyName,
            selectedOptions?.ribbon?.length,
            currentDresses?.dressGender
        );

        if (ribbonsCords) {
            setPositions((prev) => {
                return {
                    ...prev,
                    ribbonsChest: ribbonsCords,
                };
            });
        }
    }, [currentDresses?.keyName, selectedOptions?.ribbon?.length]);

    useEffect(() => {
        let leftbicepCords = GetLeftBicepCord(currentDresses?.keyName);

        if (leftbicepCords) {
            setPositions((prev) => {
                return {
                    ...prev,
                    leftbicepCords: leftbicepCords,
                };
            });
        }
    }, [currentDresses?.keyName,selectedOptions?.leftbicepCords,]);

    useEffect(() => {
        let neckMedalCords = GetNeckMedalsCord(currentDresses?.keyName);

        if (neckMedalCords) {
            setPositions((prev) => {
                return {
                    ...prev,
                    neckMedalCords: neckMedalCords,
                };
            });
        }
    }, [currentDresses?.keyName]);

    const handleEnter = (e, image, imgae_two) => {
        e.preventDefault();
        e.stopPropagation();
        if (imgae_two) {
            setSizeModel({
                isShow: true,
                sizeImage_one: image,
                sizeImage_two: imgae_two,
            });
        } else {
            setSizeModel({
                isShow: true,
                sizeImage_one: image,
                sizeImage_two: null,
            });
        }
    };
    const handleLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setSizeModel({
            isShow: false,
            sizeImage_one: null,
            sizeImage_two: null,
        });
    };
    const handlePdfModel = (e) => {
        e.stopPropagation();
        setSelectedOptions((prev) => {
            return {
                ...prev,
                showPdfModel: !prev.showPdfModel,
            };
        });
    };

    const ToggleNameModel = (e) => {
        e.stopPropagation();
        setSelectedOptions((prev) => {
            return {
                ...prev,
                showNameTallyModel: !prev.showNameTallyModel,
            };
        });
    };

    const [scale, setScale] = useState(1);

    useEffect(() => {
        const handleZoom = () => {
            // Detect the current browser zoom level
            const zoomLevel = window.devicePixelRatio;
            setScale(1 / zoomLevel); // Set inverse scale
        };

        // Attach event listener
        window.addEventListener("resize", handleZoom);
        handleZoom(); // Apply the scaling on the initial render

        return () => {
            window.removeEventListener("resize", handleZoom);
        };
    }, []);

    return (
        <Box
            component={"section"}
            // sx={{
            //     width: "1500px",
            //     height: "100%",
            //     margin: "0 auto",
            //     overflow: "hidden",
            // }}
        >
            <Box
                className="secondary_header"
                sx={{
                    backgroundColor: "#064780",
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    padding: "0.5rem 0",
                }}
            >
                <Container maxWidth="lg">
                    <Box className="flex_center">
                        <List className="flex_center" sx={{ gap: "1rem", flexWrap: "wrap" }}>
                            {/* <Cusg */}

                            {editHeaderMenu.map((item, index) => (
                                <CustomListItem
                                    key={index}
                                    onClick={() => handleSetTabData(item?.tabNum)}
                                    sx={{
                                        cursor: "pointer",
                                        width: "fit-content",
                                        whiteSpace: "nowrap",
                                        background:
                                            currentTab === item.tabNum ? "white" : "#064780",
                                        color: currentTab === item.tabNum ? "#064780" : "white",
                                    }}
                                >
                                    {item.tabNam}
                                </CustomListItem>
                            ))}
                            <CustomListItem
                                onClick={handlePdfModel}
                                sx={{
                                    cursor: "pointer",
                                    width: "fit-content",
                                    whiteSpace: "nowrap",
                                    background: currentTab === 10 ? "white" : "#064780",
                                    color: currentTab === 10 ? "#064780" : "white",
                                }}
                            >
                                Pdfs
                            </CustomListItem>
                        </List>
                    </Box>
                </Container>
            </Box>
            <Box
                sx={{
                    backgroundImage: `url(${bgArmy})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center bottom",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <Container maxWidth="lg" className="wrapper">
                    <Box
                        className="flex_center"
                        sx={{
                            // position: "absolute",
                            // top: "50%",
                            // left: "50%",
                            // transform: `translate(-50%, -50%) scale(${scale})`,
                            // transformOrigin: "center", // Keep the scaling centered
                            // width: "1300px",
                            // height: "850px",
                            // alignItems: "center",

                            width: "1200px",
                            height: "100%",
                            margin: "0 auto",
                            overflow: "hidden",

                            mt: "2rem",
                            gap: "2rem",
                            alignItems: "flex-start",
                        }}
                    >
                        <Box
                            className="flex_center"
                            sx={{
                                padding: "3rem 0 2rem 0",
                                width: "43%",
                                height: "100%",
                                background: "rgba(0, 0, 0, 0.1)",
                                borderRadius: "1rem",
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                boxShadow:
                                    "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                            }}
                        >
                            <Box sx={{ width: "20rem", height: "50rem", position: "relative" }}>
                                {/* {true && ( */}
                                {sizeModel?.isShow && (
                                    <Box
                                        className="flex_center"
                                        sx={{
                                            position: "absolute",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            top: "0",
                                            right: "-3rem",
                                            width: "7rem",
                                            height: "7rem",
                                            background: "black",
                                            borderRadius: "1rem",
                                        }}
                                    >
                                        {sizeModel?.sizeImage_two && (
                                            <Box
                                                sx={{
                                                    width: "1rem",
                                                    height: "1rem",
                                                    top: "0",
                                                    right: "0",
                                                }}
                                            >
                                                <img
                                                    src={sizeModel?.sizeImage_two}
                                                    alt="edit-uniform-image"
                                                    width={"100%"}
                                                    height={"100%"}
                                                    style={{ objectFit: "contain" }}
                                                />
                                            </Box>
                                        )}
                                        <Box sx={{ width: "5rem", height: "5rem" }}>
                                            <img
                                                src={sizeModel?.sizeImage_one}
                                                alt="edit-uniform-image"
                                                width={"100%"}
                                                height={"100%"}
                                                style={{ objectFit: "contain" }}
                                            />
                                        </Box>
                                    </Box>
                                )}
                                <img
                                    src={currentDresses?.dressImg}
                                    alt="edit-uniform-image"
                                    width={"100%"}
                                    height={"100%"}
                                    style={{ objectFit: "contain" }}
                                />
                                <GoldButtons
                                    currentDresses={currentDresses}
                                    selectedOptions={selectedOptions}
                                    handleEnter={handleEnter}
                                    handleLeave={handleLeave}
                                />
                                {currentDresses?.keyName === "WorkingDressWhite" && (
                                    <BeltStars
                                        currentDresses={currentDresses}
                                        selectedOptions={selectedOptions}
                                        handleEnter={handleEnter}
                                        handleLeave={handleLeave}
                                    />
                                )}
                                <Box
                                    className="flex_center"
                                    sx={{
                                        position: "absolute",
                                        top: positions?.rightBox?.cord_one,
                                        left: positions?.rightBox?.cord_two,
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: "1px",
                                    }}
                                >
                                    {/* {!currentDresses?.tally && ( */}
                                    {/* {!currentDresses?.tallyFlagRemove && ( */}
                                    <Box
                                        sx={{
                                            width: ".6rem",
                                            height: ".76rem",

                                            marginLeft:
                                                currentDresses?.tally === "mess" ? "0px" : "8px",
                                        }}
                                        onMouseEnter={(e) => handleEnter(e, pakFlag)}
                                        onMouseLeave={(e) => handleLeave(e)}
                                    >
                                        <img
                                            src={pakFlag}
                                            alt="unifrom-logos"
                                            title={
                                                selectedOptions?.leftPocketInsignia?.length !== 3 ||
                                                selectedOptions?.rightChest?.length > 0
                                                    ? "Pak flag mast is almost touching the upper line of name tally"
                                                    : "Pak Flag is almost touching the upper edge of insignia"
                                            }
                                            width={"100%"}
                                            height={"100%"}
                                            style={{
                                                objectFit: "contain",
                                                display: currentDresses?.tallyFlagRemove
                                                    ? "none"
                                                    : "block",
                                            }}
                                        />
                                    </Box>
                                    {/* )} */}
                                    {/* )} */}
                                    <RightChestContent
                                        handleEnter={handleEnter}
                                        handleLeave={handleLeave}
                                        selectedOptions={selectedOptions}
                                        currentDresses={currentDresses}
                                        currentBadgesState={currentBadgesState}
                                        selectedInsiginas={selectedInsiginas}
                                    />
                                    {selectedOptions?.leftPocketInsignia?.length === 3 && (
                                        <ShowExtraImage
                                            handleEnter={handleEnter}
                                            handleLeave={handleLeave}
                                            badgeData={selectedOptions?.leftPocketInsignia?.[2]}
                                            currentDresses={currentDresses}
                                            size={"1rem"}
                                            title={`${selectedOptions?.leftPocketInsignia?.[2]?.name} is 1cm above name tally`}
                                        />
                                    )}
                                    {/* {selectedOptions?.leftPocketInsignia?.length === 3 && (
                                        <Box
                                            sx={{
                                                width:
                                                    selectedOptions?.leftPocketInsignia[2]?.id === 5
                                                        ? ".65rem"
                                                        : "1rem",
                                                height: ".7rem",
                                            }}
                                            onMouseEnter={(e) =>
                                                handleEnter(
                                                    e,
                                                    selectedOptions?.leftPocketInsignia?.[2]
                                                        ?.badgeImage
                                                )
                                            }
                                            onMouseLeave={(e) => handleLeave(e)}
                                        >
                                            <img
                                                src={
                                                    selectedOptions?.leftPocketInsignia[2]
                                                        ?.badgeImage
                                                }
                                                alt="unifrom-logos"
                                                title={
                                                    selectedOptions?.leftPocketInsignia[2]
                                                        ?.positionTitle
                                                }
                                                width={"100%"}
                                                height={"100%"}
                                                style={{ objectFit: "contain" }}
                                            />
                                        </Box>
                                    )} */}
                                    {!currentDresses?.tally && (
                                        <Box
                                            className="flex_center"
                                            title={
                                                currentDresses?.velcroText
                                                    ? "Name Tally Should be With Velcro and right above the right pocket"
                                                    : "Name Tally on Right Chest"
                                            }
                                            component={"body"}
                                            onClick={ToggleNameModel}
                                            sx={{
                                                width: currentDresses?.tallySize || "2.35rem",
                                                height: ".42rem",
                                                background: "black",
                                                color: currentDresses?.tallyColor
                                                    ? currentDresses?.tallyColor
                                                    : "white",
                                                fontSize: "4px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            {LimitString(selectedOptions?.NameTally, 14) ||
                                                "Name Tally"}
                                        </Box>
                                    )}
                                    {currentDresses?.tally === "mess" && (
                                        <MessNameTally
                                            selectedOptions={selectedOptions}
                                            setSelectedOptions={setSelectedOptions}
                                            currentDresses={currentDresses}
                                        />
                                    )}
                                </Box>
                                <LeftBicepContent
                                    handleEnter={handleEnter}
                                    handleLeave={handleLeave}
                                    currentDresses={currentDresses}
                                />
                                {(currentDresses?.tally === "soft" ||
                                    currentDresses?.tally === "blackSoft") && (
                                    <SoftNameTally
                                        selectedOptions={selectedOptions}
                                        setSelectedOptions={setSelectedOptions}
                                        nameIndex={1}
                                        currentDresses={currentDresses}
                                    />
                                )}
                                {currentDresses?.combat && (
                                    <SoftNameTally
                                        selectedOptions={selectedOptions}
                                        setSelectedOptions={setSelectedOptions}
                                        nameIndex={2}
                                        currentDresses={currentDresses}
                                    />
                                )}
                                {selectedOptions?.cap?.map((item) => {
                                    let itemCoordinates = GetCurrentBadge(
                                        item?.Coordinates,
                                        currentDresses?.keyName
                                    );

                                    return (
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: itemCoordinates?.cord_one,
                                                left: itemCoordinates?.cord_two,
                                                transform:
                                                    itemCoordinates?.changeDressValue &&
                                                    itemCoordinates?.scaleProperty,
                                                width: itemCoordinates?.changeDressValue
                                                    ? "5rem"
                                                    : "6rem",
                                                height: itemCoordinates?.changeDressValue
                                                    ? "5rem"
                                                    : "6rem",
                                            }}
                                        >
                                            <img
                                                onMouseEnter={(e) =>
                                                    handleEnter(e, item?.badgeImage)
                                                }
                                                onMouseLeave={(e) => handleLeave(e)}
                                                src={
                                                    item?.afns
                                                        ? item?.badgeImage_two
                                                        : item?.badgeImage
                                                }
                                                alt="unifrom-logos"
                                                title={item?.name}
                                                width={"100%"}
                                                height={"100%"}
                                                style={{ objectFit: "contain" }}
                                            />
                                        </Box>
                                    );
                                })}
                                {selectedOptions?.rank?.map((item) => {
                                    let itemCoordinates = GetCurrentBadge(
                                        item?.Coordinates,
                                        currentDresses?.keyName
                                    );
                                    return (
                                        <Box>
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    top: itemCoordinates?.right_cord_one,
                                                    left: itemCoordinates?.right_cord_two,
                                                    transform: itemCoordinates?.left_transform,

                                                    rotate: itemCoordinates?.right_rotate,
                                                    width: itemCoordinates?.width
                                                        ? itemCoordinates?.width
                                                        : "3rem",
                                                    height: itemCoordinates?.height
                                                        ? itemCoordinates?.height
                                                        : "auto",
                                                }}
                                            >
                                                <img
                                                    onMouseEnter={(e) =>
                                                        handleEnter(e, item?.badgeImage)
                                                    }
                                                    onMouseLeave={(e) => handleLeave(e)}
                                                    src={item?.badgeImage}
                                                    alt="unifrom-logos"
                                                    title={item?.name}
                                                    width={"100%"}
                                                    height={"100%"}
                                                    style={{
                                                        objectFit: "contain",
                                                        boxShadow: itemCoordinates?.boxShadow,
                                                    }}
                                                />
                                            </Box>
                                            <Box
                                                onMouseEnter={(e) =>
                                                    handleEnter(e, item?.badgeImage)
                                                }
                                                onMouseLeave={(e) => handleLeave(e)}
                                                sx={{
                                                    position: "absolute",
                                                    top: itemCoordinates?.left_cord_one,
                                                    left: itemCoordinates?.left_cord_two,
                                                    transform: itemCoordinates?.right_transform,

                                                    rotate: itemCoordinates?.left_rotate,
                                                    width: itemCoordinates?.width
                                                        ? itemCoordinates?.width
                                                        : "3rem",
                                                    height: itemCoordinates?.height
                                                        ? itemCoordinates?.height
                                                        : "auto",
                                                }}
                                            >
                                                <img
                                                    src={
                                                        item?.afns
                                                            ? item?.badgeImage_two
                                                            : item?.badgeImage
                                                    }
                                                    alt="unifrom-logos"
                                                    title={item?.name}
                                                    width={"100%"}
                                                    height={"100%"}
                                                    style={{
                                                        objectFit: "contain",
                                                        boxShadow: item?.afns
                                                            ? itemCoordinates?.boxShadow_two
                                                            : itemCoordinates?.boxShadow,
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    );
                                })}
                                <RightPocketContent
                                    handleEnter={handleEnter}
                                    handleLeave={handleLeave}
                                    selectedOptions={selectedOptions}
                                    currentDresses={currentDresses}
                                />
                                <LeftPocketContent
                                    handleEnter={handleEnter}
                                    handleLeave={handleLeave}
                                    currentDresses={currentDresses}
                                    selectedOptions={selectedOptions}
                                    currentBadgesState={currentBadgesState}
                                    selectedInsiginas={selectedInsiginas}
                                    setSelectedInsiginas={setSelectedInsiginas}
                                />
                                <Box
                                    className="left_chest flex_only"
                                    sx={{
                                        position: "absolute",
                                        top: positions?.leftChest?.cord_one,
                                        left: positions?.leftChest?.cord_two,
                                        alignItems: "flex-start",
                                        justifyContent: "start",
                                    }}
                                >
                                    <LeftChestContent
                                        handleEnter={handleEnter}
                                        handleLeave={handleLeave}
                                        selectedOptions={selectedOptions}
                                        currentDresses={currentDresses}
                                    />
                                    <MedalsContent
                                        handleEnter={handleEnter}
                                        handleLeave={handleLeave}
                                        selectedOptions={selectedOptions}
                                        currentDresses={currentDresses}
                                    />
                                    {IsPETBadgeShow && (
                                        <ShowExtraImage
                                            handleEnter={handleEnter}
                                            handleLeave={handleLeave}
                                            badgeData={IsPETBadgeShow}
                                            currentDresses={currentDresses}
                                            size={"1rem"}

                                            // title={"Worn 1cm above name tally"}
                                        />
                                    )}
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        position: "absolute",
                                        top: positions?.neckMedalCords?.cord_one,
                                        left: positions?.neckMedalCords?.cord_two,
                                        width: "1.5rem",
                                    }}
                                >
                                    <NeckMedals
                                        handleEnter={handleEnter}
                                        handleLeave={handleLeave}
                                        selectedOptions={selectedOptions}
                                        currentDresses={currentDresses}
                                    />
                                </Box>

                                <Box
                                    className="flex_center"
                                    sx={{
                                        top: positions?.ribbonsChest?.cord_one,

                                        left: positions?.ribbonsChest?.cord_two,

                                        position: "absolute",
                                    }}
                                >
                                    <RibbonModel
                                        data={selectedOptions?.ribbon}
                                        handleEnter={handleEnter}
                                        handleLeave={handleLeave}
                                        currentDresses={currentDresses}
                                    />
                                </Box>
                                <RightBicepContent
                                    handleEnter={handleEnter}
                                    handleLeave={handleLeave}
                                    selectedOptions={selectedOptions}
                                    currentDresses={currentDresses}
                                />
                            </Box>
                        </Box>
                        <Box
                            className="flex_column_center"
                            sx={{
                                borderRadius: "1rem",
                                justifyContent: "flex-start",
                                padding:
                                    currentDresses?.infoText && currentTab === 5
                                        ? "1rem 1rem 2rem 1rem"
                                        : "3rem 1rem 2rem 1rem",
                                width: "50%",
                                height: "100%",
                                maxHeight: "53rem",
                                minHeight: "53rem",
                                gap: "1rem",
                                backgroundColor: "#fff",
                                boxShadow:
                                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                            }}
                        >
                            {currentDresses?.infoText && currentTab === 5 && (
                                <Typography
                                    variant="p"
                                    color="initial"
                                    sx={{ fontSize: "12px", textAlign: "center" }}
                                >
                                    If an individual is authorized to wear multiple pool insignias,
                                    the insignia of their current pool is placed 1 cm above the
                                    ribbon, while the second insignia is positioned 1 cm above the
                                    first. If a third insignia is authorized, it is worn on the
                                    right chest above the name tally, ensuring that no more than two
                                    insignias are placed above the name tally.
                                </Typography>
                            )}
                            {currentItems?.length > 0 ? (
                                <Box
                                    className="flex_center"
                                    sx={{
                                        alignItems: "start",
                                        width: "100%",
                                        minHeight: "43rem",
                                        gap: "1rem",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {currentTab === 1 &&
                                        currentItems.map((item, index) => {
                                            let isAvailable = IsBadgeAvailable(
                                                item,
                                                currentDresses?.keyName
                                            );
                                            return (
                                                isAvailable && (
                                                    <BadgeModel
                                                        item={item}
                                                        key={item?.id}
                                                        ToggleOptions={handleRibbonClick}
                                                        selectedOptions={selectedOptions}
                                                    />
                                                )
                                            );
                                        })}
                                    {currentTab === 2 &&
                                        currentItems?.map((item, index) => {
                                            return (
                                                <BadgeModel
                                                    item={item}
                                                    key={item?.id}
                                                    ToggleOptions={ToggleOptions}
                                                    selectedOptions={selectedOptions}
                                                />
                                            );
                                        })}
                                    {currentTab === 3 &&
                                        currentItems?.map((item, index) => {
                                            return (
                                                <BadgeModel
                                                    item={item}
                                                    key={item?.id}
                                                    ToggleOptions={ToggleRank}
                                                    selectedOptions={selectedOptions}
                                                />
                                            );
                                        })}

                                    {currentTab === 4 &&
                                        currentItems?.map((item, index) => {
                                            return (
                                                <BadgeModel
                                                    item={item}
                                                    key={item?.id}
                                                    ToggleOptions={ToggleRightPocket}
                                                    selectedOptions={selectedOptions}
                                                    isLimit={true}
                                                    setSelectedInsiginas={setSelectedInsiginas}
                                                />
                                            );
                                        })}
                                    {currentTab === 5 &&
                                        currentItems?.map((item, index) => {
                                            return (
                                                <BadgeModel
                                                    item={item}
                                                    key={item?.id}
                                                    ToggleOptions={ToggleLeftChestAbove}
                                                    selectedOptions={selectedOptions}
                                                    isLimit={true}
                                                    setSelectedInsiginas={setSelectedInsiginas}
                                                />
                                            );
                                        })}
                                    {currentTab === 6 &&
                                        currentItems?.map((item, index) => {
                                            return (
                                                <BadgeModel
                                                    item={item}
                                                    key={item?.id}
                                                    ToggleOptions={ToggleRightChest}
                                                    selectedOptions={selectedOptions}
                                                    setSelectedOptions={setSelectedOptions}
                                                    isLimit={true}
                                                    setSelectedInsiginas={setSelectedInsiginas}
                                                />
                                            );
                                        })}
                                    {currentTab === 7 &&
                                        currentItems?.map((item, index) => {
                                            return (
                                                <BadgeModel
                                                    item={item}
                                                    key={item?.id}
                                                    ToggleOptions={ToggleLeftChest}
                                                    selectedOptions={selectedOptions}
                                                    isLimit={true}
                                                    setSelectedInsiginas={setSelectedInsiginas}
                                                />
                                            );
                                        })}
                                    {currentTab === 8 &&
                                        currentItems?.map((item, index) => {
                                            return (
                                                <BadgeModel
                                                    item={item}
                                                    key={item?.id}
                                                    ToggleOptions={ToggleRightBicep}
                                                    selectedOptions={selectedOptions}
                                                />
                                            );
                                        })}
                                    {currentTab === 9 &&
                                        currentItems?.map((item, index) => {
                                            return (
                                                <BadgeModel
                                                    item={item}
                                                    key={item?.id}
                                                    ToggleOptions={ToggleMedals}
                                                    selectedOptions={selectedOptions}
                                                />
                                            );
                                        })}
                                    {currentTab === 10 &&
                                        currentItems?.map((item, index) => {
                                            return (
                                                <BadgeModel
                                                    item={item}
                                                    key={item?.id}
                                                    ToggleOptions={ToggleLeftChest}
                                                    selectedOptions={selectedOptions}
                                                />
                                            );
                                        })}
                                </Box>
                            ) : (
                                <Box
                                    className="flex_center"
                                    sx={{
                                        alignItems: "start",
                                        width: "100%",
                                        minHeight: "25rem",
                                        gap: "1rem",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <Box>No Results Found</Box>
                                </Box>
                            )}

                            <Box
                                className="flex_center"
                                sx={{
                                    gap: "1rem",
                                }}
                            >
                                <CustomPageBtn
                                    className="flex_center"
                                    onClick={(e) => handlePreviousPage(e)}
                                    disabled={currentPage === 1}
                                >
                                    <ArrowBackIosNewIcon
                                        sx={{ fontSize: "1rem", fontWeight: "600" }}
                                    />
                                </CustomPageBtn>
                                <Typography
                                    variant="h5"
                                    color="initial"
                                    fontSize={"1rem"}
                                    fontWeight={"500"}
                                >
                                    Page {currentPage}
                                </Typography>
                                <CustomPageBtn
                                    className="flex_center"
                                    onClick={(e) => handleNextPage(e)}
                                    disabled={currentPage === totalPages || data?.length <= 8}
                                >
                                    <ArrowForwardIosIcon
                                        sx={{ fontSize: "1rem", fontWeight: "600" }}
                                    />
                                </CustomPageBtn>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {selectedOptions?.showNameTallyModel && (
                <ReactPortal wrapperId="external_modal_container" closePortal={ToggleNameModel}>
                    <NameModel
                        setSelectedOptions={setSelectedOptions}
                        selectedOptions={selectedOptions}
                        ToggleNameModel={ToggleNameModel}
                    />
                </ReactPortal>
            )}
            {selectedOptions?.showPdfModel && (
                <ReactPortal wrapperId="external_modal_container" closePortal={handlePdfModel}>
                    <PdfModel handlePdfModel={handlePdfModel} data={currentBadgesState?.pdfs} />
                </ReactPortal>
            )}
        </Box>
    );
};

export default EditSection;
