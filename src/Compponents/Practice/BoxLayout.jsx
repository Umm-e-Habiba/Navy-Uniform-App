import React, { useState } from "react";
import "./boxLayout.css";

// Example badge data
const badgeData = [
    { id: 1, name: "Nishan-e-Haider", image: "path_to_image/nishan-e-haider.png", seniority: 1 },
    { id: 5, name: "Nishan-e-Imtiaz", image: "path_to_image/nishan-e-imtiaz.png", seniority: 5 },
    { id: 9, name: "Sitara-e-Jurat", image: "path_to_image/sitara-e-jurat.png", seniority: 9 },
    { id: 17, name: "Hilal-e-Imtiaz", image: "path_to_image/hilal-e-imtiaz.png", seniority: 17 },
    { id: 28, name: "Sitara-e-Eisaar", image: "path_to_image/sitara-e-eisaar.png", seniority: 28 },
    {
        id: 31,
        name: "Tamgha-e-Shujaat",
        image: "path_to_image/tamgha-e-shujaat.png",
        seniority: 31,
    },
    {
        id: 44,
        name: "Tamgha-e-Basalat",
        image: "path_to_image/tamgha-e-basalat.png",
        seniority: 44,
    },
    // Add more badges here as needed
];

function BoxLayout() {
    const [selectedBadges, setSelectedBadges] = useState([]);

    const addBadge = (badgeId) => {
        const badge = badgeData.find((b) => b.id === badgeId);
        if (badge && !selectedBadges.some((b) => b.id === badgeId)) {
            setSelectedBadges([...selectedBadges, badge].sort((a, b) => a.seniority - b.seniority));
        }
    };

    const renderBadgeRows = () => {
        let rows = [];
        let currentRow = [];

        selectedBadges.forEach((badge, index) => {
            currentRow.push(badge);
            if (currentRow.length === 4 || index === selectedBadges.length - 1) {
                rows.push(currentRow);
                currentRow = [];
            }
        });

        return rows.map((row, rowIndex) => (
            <div className="badge-row" key={rowIndex}>
                {row.map((badge, index) => (
                    <div key={index} className="">
                        {/* <img src={badge.image} alt={badge.name} /> */}
                        <p className="badge" style={{ color: "#ffff" }}>
                            {badge?.name}
                        </p>
                    </div>
                ))}
            </div>
        ));
    };

    return (
        <div className="badge-app">
            {/* Badge Selector */}
            <div className="badge-selector">
                <h3>Select Badges:</h3>
                <div className="badge-list">
                    {badgeData.map((badge) => (
                        <button
                            key={badge.id}
                            onClick={() => addBadge(badge.id)}
                            className="badge-button"
                        >
                            <img src={badge.image} alt={badge.name} />
                            <span>{badge.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Uniform Display */}
            <div className="uniform">
                <h3>Uniform:</h3>
                <div className="badge-container">{renderBadgeRows()}</div>
            </div>
        </div>
    );
}

export default BoxLayout;
