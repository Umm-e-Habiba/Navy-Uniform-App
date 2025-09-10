import React from "react";
import btn_one from "../../assets/dress_one/buttons/ADMIRAL RANKS.png";
import btn_two from "../../assets/dress_one/buttons/CDRE AND BELOW RANKS.png";
import { Box } from "@mui/material";
import { buttonHolders } from "../../utils/utils";
const GoldButtons = (props) => {
    let { currentDresses, selectedOptions, handleEnter, handleLeave } = props;
    let data = buttonHolders?.find(
        (item) =>
            item?.keyName?.split(" ").includes(currentDresses?.keyName) ||
            item?.keyName === currentDresses?.keyName
    );
    return (
        <Box
            sx={{
                position: "absolute",
                top: "7.25rem",
                left: "9.9rem",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {data?.buttonCordinates?.map((item, index) => {
                return (
                    <Box
                        onMouseEnter={(e) =>
                            handleEnter(
                                e,
                                selectedOptions?.cap?.[0]?.button_one ? btn_one : btn_two
                            )
                        }
                        onMouseLeave={(e) => handleLeave(e)}
                        key={index}
                        src={selectedOptions?.cap?.[0]?.button_one ? btn_one : btn_two}
                        component={"img"}
                        title={item.btnTitle}
                        sx={{
                            width: ".7rem",
                            objectFit: "contain",
                            position: "relative",
                            top: item?.cord_one,
                            left: item?.cord_two,
                            transform: item?.scale,
                        }}
                    ></Box>
                );
            })}
        </Box>
    );
};

export default GoldButtons;
