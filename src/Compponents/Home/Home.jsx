import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import React from "react";
import UniformCreateOptions from "./UniformCreateOptions";
import bgArmy from "../../assets/bg.png";
import Loader from "../Loader";

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a delay (e.g. API call or assets loading)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500); // Adjust delay as needed

        return () => clearTimeout(timer);
    }, []);

    if (loading) return <Loader />;
    return (
        <Box
            sx={{
                height: "100vh",
                width: "100%",
                overflow: "hidden",
                backgroundImage: `url(${bgArmy})`,
                backgroundSize: "cover",
                backgroundPosition: "center bottom",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Container maxWidth="lg" className="flex_center" sx={{ height: "75%" }}>
                <Box
                    sx={{
                        gap: "2rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "2rem 0rem",
                    }}
                >
                    <UniformCreateOptions />
                </Box>
            </Container>
        </Box>
    );
};

export default Home;
