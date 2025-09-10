import { Box, Container } from "@mui/material";
import React, { useRef } from "react";
import DrawerUnformModel from "./DrawerUnformModel";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentDresses, setDefaultState } from "../../store/DressesSlice/dressesSlice";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { CustomDrawerBtn } from "../../muiStyles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <CustomDrawerBtn
            onClick={onClick}
            className={className}
            sx={{ ...style, display: "block", background: "white" }}
        >
            <ArrowBackIosNewIcon sx={{ marginRight: "0.3rem" }} />
        </CustomDrawerBtn>
    );
}
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <CustomDrawerBtn
            onClick={onClick}
            className={className}
            sx={{ ...style, display: "block", background: "white" }}
        >
            <ArrowForwardIosIcon sx={{ marginLeft: "0.3rem" }} />
        </CustomDrawerBtn>
    );
}

const HandleDrawerModel = (props) => {
    const { isDrawerOpen, handleDrawer, handleLeaveModel, handleEnterModel, currentItems } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sliderRef = useRef(null);

    const handleDressClick = (e, data) => {
        e.preventDefault();
        e.stopPropagation();
        handleDrawer(false);
        dispatch(setDefaultState(true));
        dispatch(setCurrentDresses(data));
        navigate("/edit");
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1120,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
        ],
    };

    return (
        <Container
            className="flex_center"
            id="isHover_active"
            onMouseEnter={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleEnterModel(true);
            }}
            onMouseLeave={() => {
                handleLeaveModel();
                sliderRef.current.slickGoTo(0);
            }}
            maxWidth="lg"
            sx={{
                overflow: "hidden",
                boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
                backgroundColor: "#0B0B45",
                width: "100vw",
                maxHeight: isDrawerOpen ? "25rem" : "0px",
                opacity: isDrawerOpen ? "1" : "0",
                position: "absolute",
                top: "3.6rem",
                transition:
                    "max-height 0.5s cubic-bezier(0.17, 0.67, 0.83, 1.67), opacity 0.3s ease",

                willChange: "max-height, opacity",
                borderRadius: "0 0 1rem 1rem",
                padding: isDrawerOpen ? "3rem" : "0",
                zIndex: 100,
            }}
        >
            <Slider ref={sliderRef} {...settings}>
                {currentItems?.map((item, index) => (
                    <DrawerUnformModel
                        key={index}
                        data={item}
                        handleLeaveModel={handleLeaveModel}
                        handleDressClick={handleDressClick}
                    />
                ))}
            </Slider>
            {/* <Box
                sx={{
                    display: isDrawerOpen ? "flex" : "none",
                    gap: { sm: "1rem", lg: "2rem" },
                    justifyContent: "center",
                    padding: "2rem 0rem",
                    alignItems: "flex-start",
                }}
            >
                {currentItems?.map((item, index) => (
                    <DrawerUnformModel
                        key={index}
                        data={item}
                        handleLeaveModel={handleLeaveModel}
                        handleDressClick={handleDressClick}
                    />
                ))}
            </Box>
            {TotalItems > 4 && (
                <Box
                    className="flex_center"
                    sx={{
                        justifyContent: "space-between",
                        position: "relative",
                        top: "-15rem",
                    }}
                >
                    <CustomDrawerBtn
                        disabled={currentPage < 1}
                        className="flex_center"
                        onClick={(e) => handlePreviousPage(e)}
                    >
                        <ArrowBackIosNewIcon sx={{ marginRight: "0.3rem" }} />
                    </CustomDrawerBtn>
                    <CustomDrawerBtn
                        disabled={currentPage * itemPerPage >= TotalItems}
                        className="flex_center"
                        onClick={(e) => handleNextPage(e)}
                    >
                        <ArrowForwardIosIcon sx={{ marginLeft: "0.3rem" }} />
                    </CustomDrawerBtn>
                </Box> */}
            {/* )} */}
        </Container>
    );
};

export default HandleDrawerModel;
