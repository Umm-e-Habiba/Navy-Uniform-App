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
            DressCheck?.dressCode === 4
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
                        top: GetBoxCords?.cord_one ? GetBoxCords?.cord_one : "9.3rem",
                        left: GetBoxCords?.cord_two ? GetBoxCords?.cord_two : "11.9rem",
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
                                        height: ".8rem",
                                        width: "1.3rem",
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
                            left: itemCoordinates?.cord_two,
                            width: item?.id === 5 ? ".9rem" : "1.3rem",
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
