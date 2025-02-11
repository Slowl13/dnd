import { useEffect, useState } from 'react';
import Entity from './Entity';

function App() {

  const [router, setRouter] = useState("Home")

  useEffect(()=> localStorage.setItem('route', router), [router])

  return (
    <div className="App">
      {router === "Home" && <div className='menu'>
        <button onClick={()=>{setRouter("Wiki")}}>Энциклопедия</button>
        <button onClick={()=>{setRouter("Achive")}}>Ачивки</button>
        <button onClick={()=>{setRouter("GM")}}>Гмная</button>
      </div>}
      {router === "Achive" &&
        <button onClick={()=>{setRouter("Home");}} style={{position:"fixed", left:20, top:10}}>Главное меню</button>

      }
      {router === "GM" &&
        <button onClick={()=>{setRouter("Home");}} style={{position:"fixed", left:20, top:10}}>Главное меню</button>
      }
      {router === "Wiki" && <>
        <button onClick={()=>{setRouter("Home");}} style={{position:"fixed", left:20, top:10}}>Главное меню</button>
        <Entity content="Athala"></Entity>
        <Entity content="SandAndKnowledge"></Entity>
        <Entity content="DragonsAndDemons"></Entity>
        <Entity content="Snowden"></Entity>
        <Entity content="StrangeLands"></Entity>
      </>}
    </div>
  );
}

export default App;
