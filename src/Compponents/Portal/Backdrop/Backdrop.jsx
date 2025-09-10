import React from "react";
import "./backdrop.css";

function Backdrop(props) {
    return (
        <section className="backdrop-container" onClick={props.closePortal}>
            {props.children}
        </section>
    );
}

export default Backdrop;
