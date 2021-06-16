import React from 'react';
import './App.css';

import Button from './components/Button';
import UserField from './components/UserField';
import MachineField from './components/MachineField';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            apples: ['🍎','🍎','🍎','🍎','🍎',
                     '🍎','🍎','🍎','🍎','🍎',
                     '🍎','🍎','🍎','🍎','🍎',
                     '🍎','🍎','🍎','🍎','🍎',
                     '🍎','🍎','🍎','🍎','🍎'], 
            userScore: 0,
            userArray: [],
            machineScore: 0,
            machineArray: []  
        };
    }

  handleClick = (n) => {
    this.removeFromApplesArray(n);
    this.setState({userScore: this.state.userScore + n}); // меняем счёт пользователя
    this.changeUserScoreArray(n, this.state.userArray); // меням массив с яблоками пользователя

    setTimeout(this.machineTurn, 300); // ход ИИ
  }  

  machineTurn = () => {
    for ( let i = 1; i <= 3; i++) { // i - кол-во яблок которое возьмет ИИ
        let leftApples; // кол-во яблок которое останется после того как ИИ сделает ход
        leftApples = this.state.apples.length - i; 

        // если оставшееся число яблок, сравнимое с 0 или 1 по модулю 4, то значение i единственно правильный выбор
        if ( leftApples % 4 === 0 || leftApples % 4 === 1 ) {
          this.removeFromApplesArray(i);
          this.setState({machineScore: this.state.machineScore + i}); // меняем счёт машины
          this.changeMachineScoreArray(i, this.state.machineArray); // меням массив с яблоками ИИ
        }
    }

    if(this.state.apples.length === 0) {
        return this.state.userScore % 2 == 0 ? alert('User win!') : alert('Machine win!');
    }
  }

  changeUserScoreArray = (n, arr) => {
    let localArr = [...arr]; // копируем массив наших яблок
    for (let i = 0; i < n; i++) {
      localArr.push('🍎'); // добавляем яблоки
    }
    this.setState({userArray: [...localArr]}); // меняем state 
  }  

  changeMachineScoreArray = (n, arr) => {
    let localArr = [...arr]; // копируем массив наших яблок
    for (let i = 0; i < n; i++) {
      localArr.push('🍎'); // добавляем яблоки
    }
    this.setState({machineArray: [...localArr]}); // меняем state 
  }  

  removeFromApplesArray = (n) => {
    let arr = [...this.state.apples]; // копируем массив всех яблок
    arr.splice(0,n); // убираем яблоки
    this.setState({apples: [...arr]}); // меняем state 
  }

  render() {
    return (
        <div className="App">
          <h1>Get even number of apples!</h1>
          <p>{this.state.apples.join(", ")}</p>
          <p>Number of apples: {this.state.apples.length}</p>
          <div className='buttons-block'>
            <Button color='red' value={1} handleClick={() => this.handleClick(1)}/>
            <Button color='green' value={2} handleClick={() => this.handleClick(2)}/>
            <Button color='blue' value={3} handleClick={() => this.handleClick(3)}/>
          </div>
          <div className='score-field'>
            <MachineField machineScore={this.state.machineScore} machineArray={this.state.machineArray}/>
            <UserField userScore={this.state.userScore} userArray={this.state.userArray}/>
          </div>
        </div>
      );
  }
}

export default App;
