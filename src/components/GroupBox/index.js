import React from "react";
import './styles.css';

function GroupBox({text, color, url}) {
    return (
        <a href={url} className="group-box">
            <div className="img" style={{backgroundColor: `${color}`}}></div>
            <div className="text">{text}</div>
        </a>
    );
}

export default GroupBox;