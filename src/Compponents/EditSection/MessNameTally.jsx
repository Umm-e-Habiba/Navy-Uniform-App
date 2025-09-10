import { Box } from "@mui/material";
import React from "react";
import { LimitString } from "../../utils/logics";

const MessNameTally = (props) => {
    const { selectedOptions, setSelectedOptions, currentDresses } = props;
    return (
        <Box
            title={currentDresses?.keyName === "femaleMessDressBlackWinterMessKitAFNS" || currentDresses?.keyName === "femaleMessDressBlackWinterMessKit" || currentDresses?.keyName === "MessDressWhiteSummerMessKit" || currentDresses?.keyName === "MessDressBlackWinterMessKit"
                ? currentDresses?.velcroText ? "Name Tally Should be With Velcro and right above the right pocket" : "to be worn on a bar on the right lapel extending toward the shoulder"
                : currentDresses?.velcroText ? "Name Tally Should be With Velcro and right above the right pocket" : "Name Tally on Right Chest"
            }
            className="flex_center"
            component={"body"}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedOptions((prev) => {
                    return {
                        ...prev,
                        showNameTallyModel: true,
                    };
                });
            }}
            sx={{
                width: "1.45rem",
                height: ".42rem",
                background: "black",
                color: currentDresses?.tallyColor ? currentDresses?.tallyColor : "white",
                fontSize: "4px",
                cursor: "pointer",
            }}
        >
            {LimitString(selectedOptions?.NameTally, 8) || "Name Tally"}
        </Box>
    );
};

export default MessNameTally;
