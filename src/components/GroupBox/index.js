import React from "react";
import './styles.css';

function GroupBox({text, color}) {
    return (
        <div className="group-box">
            <div className="img" style={{backgroundColor: `${color}`}}></div>
            <div className="text">{text}</div>
        </div>
    );
}

export default GroupBox;