import { useState, useEffect } from "react";
import './styles.css';
import GroupBox from "../GroupBox";
import { grupos } from '../../data/groups.js';

function Body({selectedClass}) {
    const [search, setSearch] = useState('');
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        setGroups(grupos);
    }, [])

    const filteredGroups = search.length > 0 ? 
    groups.filter(group => group.text.toLowerCase().includes(search.toLowerCase())) : [];
    
    return (
        <div className="main">
            <div className="input-styled">
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Buscar..."
                    onChange={e => setSearch(e.target.value)}
                />
            </div> 

            {search.length > 0 ? (
                <div className="group-list">
                {filteredGroups.map((group, index) => {
                    return (
                        group.course == selectedClass ? <GroupBox key={index} text={group.text} image={group.image} whatsapp_link={group.whatsapp_link} /> : ""
                    )
                })}
                </div>
            ) : (
                <div className="group-list">
                {groups.map((group, index) => {
                    return (
                        group.course == selectedClass ? <GroupBox key={index} text={group.text} image={group.image} whatsapp_link={group.whatsapp_link} /> : ""
                    )
                })}
                </div>
            )}
            
        </div>
    );
}

export default Body;