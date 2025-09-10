import React, { useEffect, useRef, useState } from "react";
import "./UniformCreateOptions.css";
import { Box, Hidden } from "@mui/material";
import { HomeInputs } from "../../utils/utils";
import { CustomCreateButton } from "../../muiStyles";
import {
    getInputData,
    LimitString,
    makeDeepCopy,
    SetDisabled,
    SetDressesData,
} from "../../utils/logics";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentDresses, setDefaultState } from "../../store/DressesSlice/dressesSlice";
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const UniformCreateOptions = () => {
    const [activeInput, setActiveInput] = useState(null);
    const [inputsData, setInputsData] = useState(HomeInputs);
    const { allDresses } = useSelector((state) => state.dresses);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const [selectedOption, setSelectedOption] = useState({});

    // const toggleDropdown = (e, id) => {
    //     e.stopPropagation(); // Prevent the event from propagating to the document listener
    //     if (activeInput === id) {
    //         // If the dropdown is already open for this input, close it
    //         setActiveInput(null);
    //     } else {
    //         // Otherwise, open the dropdown
    //         let dressData = SetDressesData(id, selectedOption, allDresses);
    //         if (id === 3) {
    //             setInputsData((prevValues) => {
    //                 let updatedState = makeDeepCopy(prevValues);
    //                 updatedState[2] = {
    //                     ...updatedState[2],
    //                     options: dressData,
    //                 };
    //                 return updatedState;
    //             });
    //         }
    //         setActiveInput(id);
    //     }
    // };

    const handleOptionClick = (option, id) => {
        setSelectedOption((prevValues) => ({
            ...prevValues,
            [id]: option,
        }));
        setActiveInput(null);
    };

    const handleUnifromCreate = () => {
        dispatch(setDefaultState(true));
        dispatch(setCurrentDresses(selectedOption?.[3]));
        navigate("/edit");
    };

    const toggleDropdown = (e, id) => {
        e.stopPropagation(); // Prevent event bubbling
        if (activeInput === id) {
            // If the current dropdown is active, close it
            setActiveInput(null);
        } else {
            // Otherwise, open the selected dropdown
            let dressData = SetDressesData(id, selectedOption, allDresses);
            if (id === 3) {
                setInputsData((prevValues) => {
                    let updatedState = makeDeepCopy(prevValues);
                    updatedState[2] = {
                        ...updatedState[2],
                        options: dressData,
                    };
                    return updatedState;
                });
            }
            setActiveInput(id);
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setActiveInput(null);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            // Cleanup event listener
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: "#0B0B45",
                padding: "2rem",
                width: "34rem",
                height: "100%",
                borderRadius: "1rem",
                boxShadow: "rgba(0, 0, 0, 1.19) 29px 29px 20px,rgba(0, 0, 0, 0.23) 0px 6px 6px",
            }}
        >
            <form onSubmit={handleUnifromCreate} className="form_container">
                <Box sx={{ gap: "1rem" }} className="flex_column_center form_wrapper">
                    {inputsData?.map((item) => {
                        let disabledInput = SetDisabled(item, selectedOption);
                        return (
                            <Box className="form_input_group" key={item?.id}>
                                <Box className="flex_center form_box">
                                    <h5
                                        className={`flex_center ${
                                            disabledInput ? "name_disabled" : ""
                                        }`}
                                    >
                                        {item?.name}
                                    </h5>
                                    <input
                                        type="text"
                                        defaultValue={
                                            item?.id === 3
                                                ? LimitString(
                                                      selectedOption[item?.id]?.dressName,
                                                      48
                                                  ) || ""
                                                : selectedOption[item?.id] || ""
                                        }
                                        className="form_input"
                                        disabled={disabledInput}
                                        readOnly
                                        onClick={(e) => toggleDropdown(e, item?.id)}
                                    />

                                    <div className="input_icon">
                                        <KeyboardArrowDownIcon
                                            color="#0B0B45"
                                            onClick={(e) => toggleDropdown(e, item?.id)}
                                        />
                                    </div>
                                </Box>
                                {activeInput === item?.id && (
                                    <div className="dropdown flex_column_center" ref={dropdownRef}>
                                        <div
                                            style={{
                                                overflowY:
                                                    item?.options.length > 6 ? "scroll" : "visible",
                                                height: item?.options.length > 6 ? "20rem" : "auto",
                                            }}
                                        >
                                            {getInputData(
                                                item,
                                                handleOptionClick,
                                                selectedOption,
                                                setCurrentDresses
                                            )}
                                        </div>
                                    </div>
                                )}
                            </Box>
                        );
                    })}
                </Box>
                <Box sx={{ width: "100%", marginTop: "1rem" }} className="flex_center">
                    <CustomCreateButton
                        disabled={!selectedOption[1] || !selectedOption[2] || !selectedOption[3]}
                        type="submit"
                        sx={{ borderRadius: "0.6rem" }}
                    >
                        View Uniform
                    </CustomCreateButton>
                </Box>
            </form>
        </Box>
    );
};

export default UniformCreateOptions;
