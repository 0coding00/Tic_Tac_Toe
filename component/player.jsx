import { useState } from "react";
export default function Player({initialName,symbol ,isActive, onChangeName}){
    const [isEditing,setIsEditing]=useState(false);
    const [updatedName,setUpdatedName]=useState(initialName);
    function handleBtnName(e){
        setUpdatedName(e.target.value);
    }
    function handleClick(){
       setIsEditing((editing)=>!editing); 
       if(isEditing) {
        onChangeName(symbol,updatedName)
       }      
    }
    let btnCaption
    let playerName=<span className="player-name">{updatedName}</span>;
    if(isEditing)
        playerName=<input type="text" required value={updatedName} onChange={handleBtnName}/>
    return(
        <li className={isActive ? "active" : undefined }>
        <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
        </span>
      <button onClick={handleClick}>{isEditing ?btnCaption="Save":btnCaption="Edit"}</button>
      </li>
    );
}