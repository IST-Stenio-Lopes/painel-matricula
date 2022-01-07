import React from "react";
import img404 from '../../assets/error-404.jpg';
import "../404/style.css";

export default function Error() {
    return (
        <div id="error">
            <img src={img404} />
        </div>
    );
}