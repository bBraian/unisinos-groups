import './styles.css';
import Unisinos from '../../assets/uni.png';

function Header({setSelectedClass}) {
    return (
        <div className="header">
            <div className="background">
                <div className="header-align">
                    <img src={Unisinos} alt="logo_unisinos" className="unisinos-logo" />
                    <select className="header-select" onChange={(e) => {setSelectedClass(e.target.value)}}>
                        <option value="1">Análise e Desenvolvimento de Sistemas</option>
                        <option value="2">Ciência da Computação</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Header;