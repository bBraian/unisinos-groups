import { useState, useEffect } from "react";
import './styles.css';
import GroupBox from "../GroupBox";
import { grupos } from '../../data/groups.js';

function Body({selectedClass}) {
    const [search, setSearch] = useState('');
    const [groups, setGroups] = useState([]);
    const [filter, setFilter] = useState('');
    const [filteredGroups, setFilteredGroups] = useState([]);

    useEffect(() => {
        setGroups(grupos);
    }, [])

    useEffect(() => {
        if(search.length > 0) {
            setFilteredGroups(groups.filter(group => group.text.toLowerCase().includes(search.toLowerCase())));
        }
        if(filter != '') {
            setFilteredGroups(groups.filter(group => group.semester == filter));
        }
    }, [search, filter])

    
    return (
        <div className="main">
            <div className="input-styled">
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Buscar..."
                    onChange={e => setSearch(e.target.value)}
                />
                <select className="select-filter" onChange={e => setFilter(e.target.value)}>
                    <option>Semestre</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div> 

            {search.length > 0 | filter != '' ? (
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