import React from "react";
import './styles.css';
import Unisinos from '../../assets/unisinos.png';

function Header() {
    return (
        <div className="header">
            <div className="background">
                <div className="header-align">
                    <img src={Unisinos} alt="logo_unisinos" className="unisinos-logo" />
                    <select className="header-select">
                        <option value="1">Análise e Desenvolvimento de Sistemas</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Header;