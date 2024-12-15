import React, { useState } from "react";
import './Menu.css'
import App from './App.jsx'



function Menu({onProceed, handlePlayer1, handlePlayer2, handlePlayer1color, handlePlayer2color}){
    // initialize states
    // player names
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    // player colors
    const [player1color, setplayer1color] = useState('');
    const [player2color, setplayer2color] = useState('');

    const handleProceed = ()=>{
        if(player1 && player2 && player1color && player2color){
            handlePlayer1(player1);
            handlePlayer2(player2);
            handlePlayer1color(player1color);
            handlePlayer2color(player2color);
            onProceed();
        } else{
            const inputs = document.querySelectorAll('#Menu input[type=text]');
            inputs.forEach(input=>{
                if(!input.value){
                    input.classList.add('highlighted');
                }
                else{
                    input.classList.remove('highlighted');
                }
            })
            const colors = document.querySelectorAll('#Menu input[type=color]');
            colors.forEach(color=>{
                if(color.value === '#000000'){
                    color.classList.add('highlighted');
                }
                else{
                    color.classList.remove('highlighted');
                }
            })
        }
    }
    return(
        <div id="Menu">
            <label htmlFor="player1">Player1</label>
            <div>
                <input type="text" name="playre1" id="player1" placeholder="Enter Player1 Name" onChange={(e)=>{setPlayer1(e.target.value)}} required/>
                <input type="color" className="colorpicker" name="player1" id="player1color" onInput={(e)=>{setplayer1color(e.target.value)}} required/>
            </div>
            <label htmlFor="player2">Player2</label>
            <div>
                <input type="text" name="playre2" id="player2" placeholder="Enter Player2 Name" onChange={(e)=>{setPlayer2(e.target.value)}} required/>
                <input type="color" className="colorpicker" name="player2" id="player2color" onInput={(e)=>{setplayer2color(e.target.value)}} required/>
            </div>
            <button onClick={handleProceed}>Proceed</button>
        </div>
    );
}
export default Menu;