import React from "react";
import './styles.css';
import { AiFillHeart } from 'react-icons/ai';
import { FaWhatsapp } from 'react-icons/fa';

function Footer() {
    return (
        <div className="footer">
            <div className="text-footer">Feito com amor e ódio por Braian <AiFillHeart /></div>
            <div className="whatsapp-link-footer">
                <div className="suport-button">
                    <div className="text-button">Suporte</div>
                    <div className="icon-button"><FaWhatsapp /></div>
                </div>
            </div>
        </div>
    );
}

export default Footer;