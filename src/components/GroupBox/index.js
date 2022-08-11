import React from "react";
import './styles.css';

function GroupBox({text, color, url}) {
    return (
        <a href={url} className="group-box">
            <img src={color} className="img" alt={text} />
            {/* <div className="img" style={{backgroundImage: `${color}`}}></div> */}
            <div className="text">{text}</div>
        </a>
    );
}

export default GroupBox;