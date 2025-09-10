import { Box, Container } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import React, { useEffect, useState } from "react";
import { CustomMenuBox } from "../../muiStyles";
import HandleDrawerModel from "./HandleDrawerModel";
import { useSelector } from "react-redux";
import logo from "../../assets/whitenavylogo.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Header = () => {
    const { maleDresses, femaleDresses } = useSelector((state) => state.dresses);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [genderSelect, setGenderSelect] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const handleDrawer = (newOpen) => {
        setIsDrawerOpen(newOpen);
    };

    const handleGender = (gender) => {
        setGenderSelect(gender);
    };

    const handleEnterModel = (newOpen) => {
        if (genderSelect !== null) {
            setIsDrawerOpen(newOpen);
        }
    };
    const handleLeaveModel = () => {
        setIsDrawerOpen(false);
        setGenderSelect(null);
    };

    return (
        <Box
            className="flex_center"
            sx={{ backgroundColor: "#0B0B45", width: "100%", height: "75px" }}
        >
            <Container maxWidth="lg">
                <Box
                    className="flex_between_center"
                    component={"nav"}
                    sx={{
                        zIndex: "100",
                        alignItems: "center",
                        justifyContent: "start",
                        gap: "3.5rem",
                    }}
                >
                    <Box className="menu flex_center" sx={{ gap: "1rem" }}>
                        <CustomMenuBox
                            className="flex_center"
                            href="/"
                            sx={{
                                fontSize: "1rem",
                                fontWeight: "500",
                                gap: "0.3rem",
                                color: "white",

                                textDecoration: "none",
                            }}
                        >
                            Home <HomeIcon />
                        </CustomMenuBox>

                        <CustomMenuBox
                            // onClick={(e) => {
                            //     e.stopPropagation();
                            //     e.preventDefault();

                            //     handleDrawer(!isDrawerOpen);
                            //     setGenderSelect("male");
                            // }}
                            onMouseEnter={(e) => {
                                e.stopPropagation();
                                e.preventDefault();

                                handleDrawer(true);
                                setGenderSelect("male");
                            }}
                            onMouseLeave={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleDrawer(false);
                            }}
                            className={`flex_center ${
                                genderSelect === "male" && isDrawerOpen ? "active" : ""
                            }`}
                            component={"button"}
                            sx={{
                                fontSize: "1rem",
                                fontWeight: "500",
                                gap: "0.3rem",
                                color: "white",
                            }}
                        >
                            Male <ManIcon />
                        </CustomMenuBox>

                        <CustomMenuBox
                            // onClick={(e) => {
                            //     e.stopPropagation();
                            //     e.preventDefault();

                            //     handleDrawer(!isDrawerOpen);
                            //     setGenderSelect("female");
                            // }}
                            onMouseEnter={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleDrawer(true);
                                setGenderSelect("female");
                            }}
                            onMouseLeave={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleDrawer(false);
                            }}
                            className={`flex_center ${
                                genderSelect === "female" && isDrawerOpen ? "active" : ""
                            }`}
                            component={"a"}
                            sx={{
                                fontSize: "1rem",
                                fontWeight: "500",
                                gap: "0.3rem",
                                color: "white",
                            }}
                        >
                            Female <WomanIcon />
                        </CustomMenuBox>
                    </Box>
                    <Box
                        component={"h1"}
                        href="/"
                        sx={{
                            fontSize: "1.4rem",
                            fontWeight: "500",
                            gap: "0.3rem",
                            color: "white",
                            fontStyle: "italic",
                            letterSpacing: "2px",
                        }}
                    >
                        Pakistan Navy Uniforms Protocol
                    </Box>
                </Box>
            </Container>
            {genderSelect === "male" ? (
                <HandleDrawerModel
                    isDrawerOpen={isDrawerOpen}
                    genderSelect={genderSelect}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    handleDrawer={handleDrawer}
                    handleEnterModel={handleEnterModel}
                    handleLeaveModel={handleLeaveModel}
                    currentItems={maleDresses}
                />
            ) : (
                <HandleDrawerModel
                    isDrawerOpen={isDrawerOpen}
                    genderSelect={genderSelect}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    handleDrawer={handleDrawer}
                    handleEnterModel={handleEnterModel}
                    handleLeaveModel={handleLeaveModel}
                    currentItems={femaleDresses}
                />
            )}
        </Box>
    );
};

export default Header;
