import { Box } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CustomCreateButton } from "../../muiStyles";
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
                <input
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
                <Box sx={{ width: "100%", marginTop: "1.5rem" }} className="flex_center">
                    <CustomCreateButton
                        type="button"
                        disabled={!selectedOptions?.NameTally}
                        sx={{
                            width: "10rem",
                            height: "2.8rem",
                            borderRadius: "0.7rem",
                            color: "#064780",
                            background: "#ffffff",
                            cursor: "pointer",
                            fontSize: "1rem",
                            fontWeight: "600",
                            border: "2px solid transparent",
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            "&:hover": {
                                background: "#f0f8ff",
                                border: "2px solid #064780",
                                transform: "translateY(-2px)",
                                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                            },
                            "&:active": {
                                transform: "translateY(0px)",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            },
                            "&:disabled": {
                                opacity: 0.5,
                                cursor: "not-allowed",
                                transform: "none",
                            },
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
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
                </Box>
            </Box>
        </Box>
    );
};

export default NameModel;
