import React from "react";
import './styles.css';
import { FaHeart } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import Swal from 'sweetalert2';

function Footer() {
    function openSuportModal() {
        Swal.fire({
            title: 'Atenção',
            text: 'Somente use o suporte para mandar novas cadeiras a serem adicionadas ou para relatar problemas, se não, não enche meu saco por favor, com amor, Braian',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                window.open("https://api.whatsapp.com/send?phone=5551996268989");
            }
        })
    }
    return (
        <div className="footer">
            <div className="text-footer">Feito com amor e ódio por Braian <FaHeart /></div>
            <a className="whatsapp-link-footer" onClick={() => openSuportModal()}>
                <div className="suport-button">
                    <div className="text-button">Suporte</div>
                    <div className="icon-button"><FaWhatsapp /></div>
                </div>
            </a>
        </div>
    );
}

export default Footer;