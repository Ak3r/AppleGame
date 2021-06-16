import React, { useState } from 'react';
import './App.css';

import Button from './components/Button';
import UserField from './components/UserField';
import MachineField from './components/MachineField';

function App() {
  const [apples, setApples] = useState(['🍎','🍎','🍎','🍎','🍎',
                                        '🍎','🍎','🍎','🍎','🍎',
                                        '🍎','🍎','🍎','🍎','🍎',
                                        '🍎','🍎','🍎','🍎','🍎',
                                        '🍎','🍎','🍎','🍎','🍎']);

  const [userScore, setUserScore] = useState(0);
  const [myApplesArray, setMyApplesArray] = useState([]);

  const [machineScore, setMachineScore] = useState(0);
  const [machineApplesArray, setMachineApplesArray] = useState([]);

  const handleClick = (n) => {
    setUserScore(userScore + n); // меняем счёт пользователя
    // -----------------------------------------------
    setUserScore((userScore) => {
      console.log(userScore); // "React is awesome!"
      
      return userScore;
    });
    // -----------------------------------------------
    changeScoreArray(n, myApplesArray, setMyApplesArray); // меням массив с яблоками пользователя

    setTimeout(machineTurn, 1000); // ход ИИ
  }  

  const machineTurn = () => {
    for ( let i = 1; i <= 3; i++) { // i - кол-во яблок которое возьмет ИИ
        let leftApples; // кол-во яблок которое останется после того как ИИ сделает ход
        leftApples = apples.length - i; 

        // если оставшееся число яблок, сравнимое с 0 или 1 по модулю 4, то значение i единственно правильный выбор
        if ( leftApples % 4 === 0 || leftApples % 4 === 1 ) {
          setMachineScore(machineScore + i); // меняем счёт машины
          // -----------------------------------------------
          setMachineScore((machineScore) => {
            console.log(machineScore); 
            
            return machineScore;
          });
          // -----------------------------------------------
          changeScoreArray(i, machineApplesArray, setMachineApplesArray); // меням массив с яблоками ИИ
        }
        console.log(machineScore+userScore)
        removeFromApplesArray((machineScore+userScore))
    }
  }

  const changeScoreArray = (n, arr, setArr) => {
    let localArr = [...arr]; // копируем массив наших яблок
    for (let i = 0; i < n; i++) {
      localArr.push('🍎'); // добавляем яблоки
    }
    setArr([...localArr]); // меняем state 
  }  

  const removeFromApplesArray = (n) => {
    let arr = [...apples]; // копируем массив всех яблок
    arr.splice(0,n); // убираем яблоки
    setApples([...arr]); // меняем state 
  }

  return (
    <div className="App">
      <h1>Get even number of apples!</h1>
      <p>{apples.join(", ")}</p>
      <p>Number of apples: {apples.length}</p>
      <div className='buttons-block'>
        <Button color='red' value={1} handleClick={() => handleClick(1)}/>
        <Button color='green' value={2} handleClick={() => handleClick(2)}/>
        <Button color='blue' value={3} handleClick={() => handleClick(3)}/>
      </div>
      <div className='score-field'>
        <MachineField machineScore={machineScore} machineApplesArray={machineApplesArray}/>
        <UserField userScore={userScore} myApplesArray={myApplesArray}/>
      </div>
    </div>
  );
}

export default App;
