import React, {useState} from "react";
import App from './App.jsx'
import Menu from './Menu.jsx'


function Navigation(){
    const [currentComponent, setCurrentComponent] = useState('Menu');
    const [Player1, setPlayer1] = useState('Player1');
    const [Player2, setPlayer2] = useState('Player2');
    const [player1color, setplayer1color] = useState('#000000');
    const [player2color, setplayer2color] = useState('#000000');

    const handlePlayer1Name = (ChildData)=>{
        setPlayer1(ChildData);
    }
    const handlePlayer2Name = (ChildData)=>{
        setPlayer2(ChildData);
    }
    const handlePlayer1color = (childData)=>{
        setplayer1color(childData);
    } 
    const handlePlayer2color = (childData)=>{
        setplayer2color(childData);
    }
    const renderComonent = () => {
      if(currentComponent === 'Menu'){
        return(<Menu handlePlayer1={handlePlayer1Name} handlePlayer1color={handlePlayer1color} handlePlayer2color={handlePlayer2color} handlePlayer2={handlePlayer2Name} onProceed={()=>setCurrentComponent('App')}/>);
      }
      else if(currentComponent === 'App'){
        return(<App player1Name={Player1} player2Name={Player2} player1color={player1color} player2color={player2color} onGoBack={()=>setCurrentComponent('Menu')}/>);
      }
    };
    return(
        <>
            {renderComonent()}
        </>
        
    );
}
export default Navigation;

