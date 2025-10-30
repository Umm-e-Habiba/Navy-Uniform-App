import React from "react";
import { Box } from "@mui/material";

const PocketMedals = (props) => {
	const { selectedOptions, currentDresses, handleEnter, handleLeave } = props;

	return (
		<>
			{selectedOptions?.Medals?.filter((m) => m?.pocketMedal)?.map((item, index) => (
				<Box
					key={`pocket-${index}`}
					onMouseEnter={(e) => handleEnter(e, item?.badgeImage)}
					onMouseLeave={(e) => handleLeave(e)}
					sx={{
						width: item?.width ? item?.width : "1.5rem",
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




