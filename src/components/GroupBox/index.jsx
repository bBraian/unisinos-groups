import './styles.css';

function GroupBox({text, image, whatsapp_link}) {
    const colors = ['#db3026','#e88a25','#f9e14b','#efed89','#7abf66','#00a0b0','#edc951','#070743','#169d99','#b9cc01','#fae894',
    '#ab0768','#44749d','#c6d4e1','#ffffff','#ebe7e0','#69d2e7','#e0e4cc','#f38630','#fa6900','#02fcf3','#1b676b','#88c425',
    '#bef202','#3d0a49','#5015bd','#027fe9','#00caf8','#e0daf7','#ffbf91','#ff9a52','#d4ee5e','#ff4242','#ff8482','#f2e5f9','#273142'];

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    return (
        <a href={whatsapp_link} className="group-box">
            { image != ""? <img src={image} className="img" alt={text} /> : <div className="img" style={{backgroundColor: `${colors[Math.floor(Math.random() * 34)]}`}}></div> }
            <div className="text">{text}</div>
        </a>
    );
}

export default GroupBox;