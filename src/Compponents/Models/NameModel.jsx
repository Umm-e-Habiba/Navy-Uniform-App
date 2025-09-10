import { Box } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
const NameModel = (props) => {
    const { setSelectedOptions, selectedOptions, ToggleNameModel } = props;
    return (
        <Box
            sx={{
                width: "24rem",
                height: "13rem",
                backgroundColor: "#064780",
                borderRadius: "1rem",
                padding: "2rem",
                position: "relative",
            }}
        >
            <CloseIcon
                onClick={ToggleNameModel}
                sx={{
                    color: "white",
                    position: "absolute",
                    top: ".7rem",
                    left: "21.5rem",
                    cursor: "pointer",
                }}
                s
            />
            <Box
                className="name_model"
                sx={{
                    display: "flex",
                    gap: ".5rem",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                <inputf
                    type="text"
                    placeholder="Enter Name Tally"
                    value={selectedOptions?.NameTally}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    onChange={(e) => {
                        if (e.target.value.split(" ").join("").length < 13) {
                            setSelectedOptions((prev) => {
                                return {
                                    ...prev,
                                    NameTally: e.target.value.toUpperCase(),
                                };
                            });
                        }
                    }}
                />
                {/* <Box sx={{ width: "100%", marginTop: "1rem" }} className="flex_center">
                    <CustomCreateButton
                        disabled={!selectedOptions?.NameTally}
                        sx={{
                            width: "8rem",
                            height: "3rem",
                            borderRadius: "1rem",

                            color: "black",
                            background: "#e6e6e6",
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            setSelectedOptions((prev) => {
                                return {
                                    ...prev,
                                    showNameTallyModel: false,
                                };
                            });
                        }}
                    >
                        Add Name
                    </CustomCreateButton>
                </Box> */}
            </Box>
        </Box>
    );
};

export default NameModel;
