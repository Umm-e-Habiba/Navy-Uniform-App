import { Box } from "@mui/material";
import React from "react";
import {
    GetCurrentDressChecks,
    GetRightChestTitles,
    UpdatedDataToShow,
    UpdatedTitles,
} from "../../utils/logics";

const RightChestContent = (props) => {
    const {
        selectedOptions,
        currentDresses,
        handleEnter,
        handleLeave,
        currentBadgesState,
        selectedInsiginas,
    } = props;
    const GetCurrentContent = () => {
        let DressCheck = GetCurrentDressChecks(currentDresses?.keyName);
        if (
            selectedOptions?.rightChest?.length === 1 &&
            selectedOptions?.leftPocketInsignia?.length === 0
        ) {
            let item = selectedOptions?.rightChest?.[0];
            return (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            width: "1rem",
                            height: ".7rem",
                            transform: item?.sizeScale ? item?.sizeScale : "unset",
                        }}
                        onMouseEnter={(e) => handleEnter(e, item?.badgeImage)}
                        onMouseLeave={(e) => handleLeave(e)}
                    >
                        <img
                            src={item?.badgeImage}
                            alt="unifrom-logos"
                            title={`${
                                selectedOptions?.rightChest[0]?.name + " " + item?.title_one
                            }`}
                            width={"100%"}
                            height={"100%"}
                            style={{ objectFit: "contain" }}
                        />
                    </Box>
                </>
            );
        } else if (
            DressCheck?.dressCode === 2 ||
            DressCheck?.dressCode === 3 ||
            DressCheck?.dressCode === 4
        ) {
            let data = UpdatedDataToShow(
                DressCheck,
                selectedOptions?.rightChest,
                selectedOptions?.leftPocketInsignia
            );
            return data?.map((item, index) => {
                let getUpdatedTitle = UpdatedTitles(
                    index,
                    item,
                    DressCheck,
                    currentDresses?.hoverData,
                    selectedOptions,
                    "rightChest"
                );
                return (
                    <Box
                        key={item?.id}
                        sx={{
                            display: "flex",
                            width: "1rem",
                            height: ".7rem",
                            transform: item?.sizeScale ? item?.sizeScale : "unset",
                        }}
                        onMouseEnter={(e) => handleEnter(e, item?.badgeImage)}
                        onMouseLeave={handleLeave}
                    >
                        <img
                            src={item?.badgeImage}
                            alt="uniform-logos"
                            title={getUpdatedTitle}
                            width="100%"
                            height="100%"
                            style={{ objectFit: "contain" }}
                        />
                    </Box>
                );
            });
            //     if (
            //         selectedOptions?.rightChest?.length === 1 &&
            //         selectedOptions?.leftPocketInsignia?.length === 1
            //     ) {
            //         return null;
            //     } else if (
            //         (selectedOptions?.rightChest?.length === 2 &&
            //             selectedOptions?.leftPocketInsignia?.length === 1) ||
            //         (selectedOptions?.rightChest?.length === 2 &&
            //             selectedOptions?.leftPocketInsignia?.length === 3)
            //     ) {
            //         return (
            //             <Box
            //                 key={selectedOptions?.rightChest?.[1]?.id}
            //                 sx={{
            //                     display: "flex",
            //                     width: "1rem",
            //                     height: ".7rem",
            //                     transform: selectedOptions?.rightChest?.[1]?.sizeScale
            //                         ? selectedOptions?.rightChest?.[1]?.sizeScale
            //                         : "unset",
            //                 }}
            //                 onMouseEnter={(e) =>
            //                     handleEnter(e, selectedOptions?.rightChest?.[1]?.badgeImage)
            //                 }
            //                 onMouseLeave={(e) => handleLeave(e)}
            //             >
            //                 <img
            //                     src={selectedOptions?.rightChest?.[1]?.badgeImage}
            //                     alt="unifrom-logos"
            //                     title={`${
            //                         selectedOptions?.rightChest?.[1]?.name +
            //                         " " +
            //                         selectedOptions?.rightChest?.[1]?.title_two +
            //                         " " +
            //                         selectedOptions?.leftPocketInsignia[2]?.name
            //                     }`}
            //                     width={"100%"}
            //                     height={"100%"}
            //                     style={{ objectFit: "contain" }}
            //                 />
            //             </Box>
            //         );
            //     } else {
            //         return selectedOptions?.rightChest?.map((item, index) => {
            //             let getUpdatedTitle = UpdatedTitles(
            //                 index,
            //                 item,
            //                 DressCheck,
            //                 currentDresses?.hoverData,
            //                 selectedOptions,
            //                 "rightChest"
            //             );
            //             return (
            //                 <Box
            //                     key={item?.id}
            //                     sx={{
            //                         display: "flex",
            //                         width: "1rem",
            //                         height: ".7rem",
            //                         transform: item?.sizeScale ? item?.sizeScale : "unset",
            //                     }}
            //                     onMouseEnter={(e) => handleEnter(e, item?.badgeImage)}
            //                     onMouseLeave={handleLeave}
            //                 >
            //                     <img
            //                         src={item?.badgeImage}
            //                         alt="uniform-logos"
            //                         title={getUpdatedTitle}
            //                         width="100%"
            //                         height="100%"
            //                         style={{ objectFit: "contain" }}
            //                     />
            //                 </Box>
            //             );
            //         });
            //     }
            // }
        }
        // else if (
        //     DressCheck?.dressCode === 4 &&
        //     selectedOptions?.rightChest?.length === 2 &&
        //     selectedOptions?.leftPocketInsignia?.length === 3
        // ) {
        //     return (
        //         <Box
        //             key={selectedOptions?.rightChest?.[1]?.id}
        //             sx={{
        //                 display: "flex",
        //                 width: "1rem",
        //                 height: ".7rem",
        //                 transform: selectedOptions?.rightChest?.[1]?.sizeScale
        //                     ? selectedOptions?.rightChest?.[1]?.sizeScale
        //                     : "unset",
        //             }}
        //             onMouseEnter={(e) =>
        //                 handleEnter(e, selectedOptions?.rightChest?.[1]?.badgeImage)
        //             }
        //             onMouseLeave={(e) => handleLeave(e)}
        //         >
        //             <img
        //                 src={selectedOptions?.rightChest?.[1]?.badgeImage}
        //                 alt="unifrom-logos"
        //                 title={
        //                     selectedOptions?.rightChest?.[1]?.name +
        //                     " " +
        //                     selectedOptions?.rightChest?.[1]?.title_two +
        //                     " " +
        //                     selectedInsiginas?.leftPocketInsignia[2]
        //                 }
        //                 width={"100%"}
        //                 height={"100%"}
        //                 style={{ objectFit: "contain" }}
        //             />
        //         </Box>
        //     );
        // }
        else {
            return selectedOptions?.rightChest?.map((item, index) => {
                let getUpdatedTitle = UpdatedTitles(
                    index,
                    item,
                    DressCheck,
                    currentDresses?.hoverData,
                    selectedOptions,
                    "rightChest"
                );
                return (
                    <>
                        <Box
                            key={item?.id}
                            sx={{
                                display: "flex",
                                width: "1rem",
                                height: ".7rem",
                                transform: item?.sizeScale ? item?.sizeScale : "unset",
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
                                style={{ objectFit: "contain" }}
                            />
                        </Box>
                    </>
                );
            });
        }
    };

    const content = GetCurrentContent();
    return <>{content}</>;
};

export default RightChestContent;
