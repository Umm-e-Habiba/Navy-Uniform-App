import { Box, Button, createTheme, ListItem, styled, Typography } from "@mui/material";

export const CustomTheme = createTheme({
    palette: {
        primary: {
            main: "#00000",
            //   main: "#142033",
            white: "#ffffff",
            light: "#fffff5",
        },
        black: "#000000",
        blackHeading: "#292b2a",
        lightWhite: "#f2f2f2",
        bgBlack: "#2f302f",
        pColor: "#5c5c2f",
        pGrey: "#808487",
        btnColor: "#00acf0",
        orangeColor: "#f56105",
        // #808080
        // lightPrimary: "rgba(255, 255, 255,0.8)",
        lightPrimary: "rgba(0, 171, 240, 0.2)",
        customGradient: "linear-gradient(162deg, rgba(0,172,240,1) 0%, rgba(20,32,51,1) 54%)",
    },
    typography: {
        fontFamily: "Oen, Arial, sans-serif",
    },
});

export const CustomBannerText = styled("h1")`
    font-family: "Oswald";
    font-size: 5.3rem;
    font-weight: 500;
    line-height: 1;
    text-shadow: 1px 1px 1px black;
    color: white;
    text-transform: uppercase;
`;
export const CustomBtn = styled("button")`
    font-family: "Open Sans";
    font-weight: 600;
    font-size: 1.2rem;
    background-color: #f2c616;
    border-radius: 5px;
    text-decoration: none;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    width: 10rem;
    height: 3.5rem;
    color: white;
    &:hover {
        border: 2px solid #f2c616;
        color: #2f302f;
        background-color: transparent;
    }
`;
// export const CustomButton = styled("a")`
//     font-family: "Roboto", sans-serif";
//     font-weight: 500;
//     font-size: 1rem;
//     text-decoration: none;
//     border: 2px solid white;
//     width: 6.5rem;
//     height: 2.4rem;
//     border-radius: 3.5rem;
//     color: white;
//      cursor: pointer;s
//     transition: all 0.3s ease-in-out;
//     &:hover {
//         color: black;
//         background-color: white;
//     }
// `;
export const CustomIconButton = styled("a")`
    font-family: "Roboto";
    font-weight: 600;
    font-size: 1.2rem;
    background-color: #000000;
    border-radius: 5px;
    text-decoration: none;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    cursor: pointer;
    width: 10rem;
    height: 3.5rem;
    color: white;
    &:hover {
        color: #000000;
        background-color: transparent;
    }
`;
export const SectionHeading = styled(Typography)`
    font-family: "Oswald";
    font-size: 3.3rem;
    font-weight: 500;
`;
export const AboutHeading = styled(Typography)`
    font-family: "Oswald";
    font-size: 5rem;
    font-weight: 500;
`;

export const CustomMenuBox = styled("a")`
    width: 6.5rem;
    height: 2.4rem;
    border-radius: 3.5rem;
    transition: all 0.3s ease-in-out;
    &:hover {
        color: black;
        background-color: white;
    }
`;

export const CustomListItem = styled(ListItem)`
    fontsize: 0.8rem;
    font-weight: 400;
    padding: 0rem 1rem;
    text-align: center;
    height: 2.5rem;
    border-radius: 2rem;
    background-color: transparent;
    border: 2px solid white;
    color: white;
    transition: all 0.3s ease-in-out;
    &:hover {
        color: black;
        background-color: white;
    }
`;

export const CustomPageBtn = styled("button")`
    padding: 0;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: black;
    color: white;
    cursor: pointer;
    border: none;
    transition: all 0.3s linear;
    &:hover {
        color: black;
        background-color: white;
        border: 2px solid black;
    }
`;
export const CustomDrawerBtn = styled("button")`
    padding: 0;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: white;
    color: black;
    cursor: pointer;
    border: none;
`;
export const CustomCreateButton = styled("button")`
    padding: 0;
    width: 10rem;
    height: 3rem;
    font-family: "Roboto", sans-serif;
    font-size: 1.2rem;
    font-weight: 500;
    background: #c7e2ff;
    color: black;
    cursor: pointer;
    border: none;
    transition: all 0.3s linear;
`;

export const CustomButton = styled("a")`
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-size: 1rem;
    text-decoration: none;
    border: 2px solid white;
    width: 6.5rem;
    height: 2.4rem;
    border-radius: 3.5rem;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        color: black;
        background-color: white;
    }
`;
