////// i am lokking for dynamic solutions of the problem but did'nt find it that is why this code , I am lokking for the solution
import { Box } from "@mui/material";
import React from "react";

import "./ribbonModel.css";
import { GetItemCords } from "../../utils/logics";
import { RibbonsCoordinates } from "../../utils/utils";

const RibbonModel = ({ data, handleEnter, handleLeave, currentDresses }) => {
    return (
        <>
            {data?.length > 0 &&
                data?.map((item, index) => {
                    const getCord = GetItemCords(RibbonsCoordinates, data?.length);
                    console.log("---------check state", item);
                    let title;
                    if (currentDresses?.dress_title) {
                        if(currentDresses?.keyName === "femaleServiceDressBlackAFNS" || currentDresses?.keyName === "femaleServiceBlackWinterCeremonialDress" || currentDresses?.keyName === "ServiceBlackDressWinter"){
                            title =
                            "Top line aligned with lapel point .";    
                        }
                        else{
                        title =
                            "Each ribbon should measure 3.18 cm. For three ribbons in a row, the total length must not exceed 9.4 cm, and for four ribbons in a row, the total length must not exceed 12.5 cm. Ribbons should be sewn on buckram or with Velcro base attached to left chest.";
                        }
                    } else {
                        if(currentDresses?.keyName === "femaleSix" || currentDresses?.keyName === "female_two" || currentDresses?.keyName === "femaleWorkingDress3WorkingSummer"){
                            title =
                            "Each ribbon should measure 3.18 cm, with the total length of all four ribbons not exceeding 12.5 cm. Ribbons must be positioned on Left Chest";    
                        }else{
                            title =  "Each ribbon should measure 3.18 cm, with the total length of all four ribbons not exceeding 12.5 cm. Ribbons must be positioned right above the left pocket.";
                        }                                                                
                    }
                    return (
                        <Box
                            onMouseEnter={(e) => handleEnter(e, item?.badgeImage)}
                            onMouseLeave={(e) => handleLeave(e)}
                            key={item.id}
                            className="badge_item"
                            sx={{
                                position: "absolute",
                                top: getCord?.itemImageCord[index]?.cord_one,
                                left: getCord?.itemImageCord[index]?.cord_two,
                            }}
                            // data-title={title}
                        >
                            <img
                                src={item?.badgeImage}
                                alt={item?.positionTitle}
                                title={title}
                                width="100%"
                                height="100%"
                                style={{ objectFit: "contain" }}
                            />
                        </Box>
                    );
                })}
        </>
    );
};

export default RibbonModel;
