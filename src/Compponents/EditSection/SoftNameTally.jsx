import { Box } from "@mui/material";
import React from "react";
import { CurrentBoxPosition, LimitString } from "../../utils/logics";
import { BoxPositions } from "../../utils/utils";

const SoftNameTally = (props) => {
    const { setSelectedOptions, selectedOptions, nameIndex, currentDresses } = props;
    let currentBoxCords = CurrentBoxPosition(BoxPositions, currentDresses?.keyName);
    return (
        <Box
            className="flex_center"
            title="Name Tally Should be With Velcro and right above the right pocket"
            component={"body"}
            onClick={(e) => {
                if (nameIndex !== 2) {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedOptions((prev) => {
                        return {
                            ...prev,
                            showNameTallyModel: true,
                        };
                    });
                }
            }}
            sx={{
                width: currentBoxCords?.width ? currentBoxCords?.width : "3rem",
                height: currentBoxCords?.height ? currentBoxCords?.height : ".9rem",
                background: currentDresses?.tallyBg ? currentDresses?.tallyBg : "#c2bbb8",
                color: "black",
                fontSize: currentBoxCords?.f_size ? currentBoxCords?.f_size : "6px",
                fontWeight: "800",
                cursor: "pointer",
                position: "absolute",
                border: "1px solid black",
                top: nameIndex === 2 ? currentBoxCords?.cord_three : currentBoxCords?.cord_one,

                left: nameIndex === 2 ? currentBoxCords?.cord_four : currentBoxCords?.cord_two,
                textTransform: "uppercase",
            }}
        >
            {nameIndex === 1
                ? LimitString(selectedOptions?.NameTally, 8) || "Name Tally"
                : "PAK NAVY"}
        </Box>
    );
};

export default SoftNameTally;
