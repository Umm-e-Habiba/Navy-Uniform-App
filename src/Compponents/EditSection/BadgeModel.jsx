import { Box, Typography } from "@mui/material";
import React from "react";
import { getBadgeBackground, LimitString, SetBadgeTitles } from "../../utils/logics";
import { toast } from "react-toastify";

const BadgeModel = (props) => {
    const { item, ToggleOptions, selectedOptions, setSelectedOptions, isLimit } = props;

    const handleItemClick = (e, item) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Badge Clicked:", item);
        if (
            selectedOptions?.rightChest?.find(
                (checkItem) => checkItem?.badgeKey === "rightChest2"
            ) &&
            item?.badgeKey === "leftPocket10"
        ) {
            return toast.warn("Already Selected on Right Pocket");
        } else if (
            item?.badgeKey === "rightChest2" &&
            selectedOptions?.leftPocketInsignia?.find(
                (checkItem) => checkItem?.badgeKey === "leftPocket10"
            )
        ) {
            setSelectedOptions((prev) => {
                let updatedData = prev?.leftPocketInsignia?.filter(
                    (i) => i?.badgeKey !== "leftPocket10"
                );
                return {
                    ...prev,
                    leftPocketInsignia: updatedData,
                    rightChest: [item],
                };
            });
        } else {
            ToggleOptions(item);
        }
    };
    const bgColor = getBadgeBackground(item, selectedOptions);
    console.log("Rendering badge:", item?.name, "identity:", item?.identity);
    return (
        <>
            <Box
                onClick={(e) => handleItemClick(e, item)}
                className="flex_column_center"
                sx={{
                    borderRadius: "1rem",
                    alignItems: "center",
                    gap: "1rem",
                    width: "10rem",
                    height: "11rem",
                    padding: "1rem",
                    boxShadow:
                        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                    "&:hover": {
                        background: "#c7e2ff",
                    },
                    background: bgColor,
                    cursor: "pointer",
                }}
            >
                <Box width={"7rem"} height={"7rem"} overflow={"hidden"}>
                    <img
                        src={item?.badgeImage}
                        alt="badges_image"
                        title={item?.name}
                        width={"100%"}
                        height={"100%"}
                        style={{
                            objectFit: "contain",
                            rotate: item?.imageRotate
                                ? item?.imageRotate
                                : item?.identity === "rank" && item?.rotate && "-90deg",
                        }}
                    />
                </Box>
                <Box className="flex_center">
                    <Typography
                        fontSize={"1rem"}
                        fontFamily={"Roboto"}
                        fontWeight={"400"}
                        variant="h5"
                        color="initial"
                        width={"8.5rem"}
                        textAlign={"center"}
                    >
                        {isLimit ? item?.name : LimitString(item?.name, 30)}
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default BadgeModel;
