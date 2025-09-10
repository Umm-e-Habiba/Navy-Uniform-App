import { Box, Typography } from "@mui/material";
import React from "react";
import { CustomMenuBox } from "../../muiStyles";
import pdfImg from "../../assets/pdf.png";
import { LimitString } from "../../utils/logics";

const pdfData = [
    {
        name: "Name Tally Pdf",
        url: "../../assets/bg.jpeg",
    },
    {
        name: "Name Tally Pdf",
        url: "../../assets/bg.jpeg",
    },
    {
        name: "Name Tally Pdf",
        url: "../../assets/bg.jpeg",
    },
    {
        name: "Name Tally Pdf",
        url: "../../assets/bg.jpeg",
    },
    {
        name: "Name Tally Pdf",
        url: "../../assets/bg.jpeg",
    },
    {
        name: "Name Tally Pdf",
        url: "../../assets/bg.jpeg",
    },
    {
        name: "Name Tally Pdf",
        url: "../../assets/bg.jpeg",
    },
    {
        name: "Name Tally Pdf",
        url: "../../assets/bg.jpeg",
    },
];

const PdfModel = (props) => {
    const { handlePdfModel, data } = props;

    return (
        <Box
            className="flex_center"
            sx={{
                alignItems: "start",
                width: "50%",
                height: "25rem",

                background: "#0B0B45",
                borderRadius: "2rem",
                position: "relative",
                boxShadow: "rgba(0, 0, 0, 1.19) 29px 29px 20px,rgba(0, 0, 0, 0.23) 0px 6px 6px",
            }}
        >
            <Box
                sx={{ position: "absolute", top: "0.7rem", right: "1rem" }}
                onClick={handlePdfModel}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20px"
                    height="20px"
                >
                    <path
                        style={{ fill: "white", cursor: "pointer" }}
                        d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"
                    />
                </svg>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "start",
                    padding: "2rem 0",
                    overflowY: pdfData?.length > 6 ? "scroll" : "visible",
                    height: pdfData?.length > 6 ? "24rem" : "auto",
                    gap: "1rem",
                    marginTop: "0.4rem",
                }}
            >
                {data?.map((item, index) => {
                    return (
                        <Box
                            key={index}
                            sx={{
                                width: "100%",
                                padding: "0rem 2rem",
                                display: "flex",
                                gap: ".5rem",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box className="flex_center" sx={{ gap: ".5rem" }}>
                                <Box sx={{ height: "1rem" }}>
                                    <img
                                        src={pdfImg}
                                        alt="pdf_icon"
                                        width={"100%"}
                                        height={"100%"}
                                        style={{ objectFit: "contain" }}
                                    />
                                </Box>
                                <Typography component={"p"} color="white">
                                    {LimitString(item?.name, 40) || "Pdf name"}
                                </Typography>
                            </Box>
                            <CustomMenuBox
                                className="flex_center"
                                href={item?.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    width: "10rem",
                                    fontSize: "1rem",
                                    fontWeight: "500",
                                    gap: "0.3rem",
                                    color: "white",
                                    textDecoration: "none",
                                    border: "1px solid white",
                                }}
                            >
                                Download Pdf
                            </CustomMenuBox>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default PdfModel;
