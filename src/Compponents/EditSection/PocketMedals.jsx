import React from "react";
import { Box } from "@mui/material";

const PocketMedals = (props) => {
	const { selectedOptions, currentDresses, handleEnter, handleLeave } = props;

	// Check if current dress is one of the two mess dresses that need miniature medals
	const isMessDressMiniature = 
		currentDresses?.keyName === "MessDressBlackWinterMessKit" || 
		currentDresses?.keyName === "MessDressWhiteSummerMessKit";

	return (
		<>
			{selectedOptions?.Medals?.filter((m) => m?.pocketMedal)?.map((item, index) => (
				<Box
					key={`pocket-${index}`}
					onMouseEnter={(e) => handleEnter(e, item?.badgeImage)}
					onMouseLeave={(e) => handleLeave(e)}
					sx={{
						width: isMessDressMiniature 
							? "0.8rem" 
							: (item?.width ? item?.width : "1.5rem"),
						height: isMessDressMiniature ? "2.4rem" : "auto",
						zIndex: 60 - item?.seniority + 1,
					}}
				>
					<img
						src={item?.badgeImage}
						alt="uniform-logos"
						title={`${item?.name} (pocket medal)`}
						width="100%"
						height="100%"
						style={{ objectFit: "contain" }}
					/>
				</Box>
			))}
		</>
	);
};

export default PocketMedals;




