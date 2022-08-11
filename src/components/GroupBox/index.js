import React from "react";
import './styles.css';

function GroupBox({text, image, whatsapp_link}) {
    return (
        <a href={whatsapp_link} className="group-box">
            <img src={image} className="img" alt={text} />
            {/* <div className="img" style={{backgroundImage: `${color}`}}></div> */}
            <div className="text">{text}</div>
        </a>
    );
}

export default GroupBox;