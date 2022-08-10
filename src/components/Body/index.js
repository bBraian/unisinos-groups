import React, { useState, useEffect } from "react";
import './styles.css';
import { FaSearch } from 'react-icons/fa';
import GroupBox from "../GroupBox";
import { grupos } from '../../data/groups.js';

function Body() {
    const [search, setSearch] = useState('');
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        setGroups(grupos);
    }, []);

    const filteredGroups = search.length > 0
    ? groups.filter(group => group.text.includes(search))
    : [];
    return (
        <div className="main">
            <div className="input-styled">
                <div className="icon"><FaSearch /></div>
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Buscar..."
                    onChange={e => setSearch(e.target.value)}
                />
            </div> 

            {search.length > 0 ? (
                <div className="group-list">
                {filteredGroups.map(group => {
                    return (
                        <GroupBox text={group.text} color={group.color} />
                    )
                })}
                </div>
            ) : (
                <div className="group-list">
                {groups.map(group => {
                    return (
                        <GroupBox text={group.text} color={group.color} />
                    )
                })}
                </div>
            )}
            
            
        </div>
    );
}

export default Body;