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
            machineArray: [], 
            disabled: false  
        };
    }

  handleClick = (n) => {
    this.removeFromApplesArray(n); // меняем общий массив яблок
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
          this.removeFromApplesArray(i); // меняем общий массив яблок
          this.setState({machineScore: this.state.machineScore + i}); // меняем счёт машины
          this.changeMachineScoreArray(i, this.state.machineArray); // меням массив с яблоками ИИ
        }
    }

    if(this.state.apples.length === 2 || this.state.apples.length === 1) {
      this.setState({
        disabled: true
      })
    }

    if(this.state.apples.length === 0) {
        return this.state.userScore % 2 === 0 ? alert('User win!') : alert('Machine win!');
    }
  }

  // меняем массив с яблоками пользователя
  changeUserScoreArray = (n, arr) => {
    let localArr = [...arr]; 
    for (let i = 0; i < n; i++) {
      localArr.push('🍎'); 
    }
    this.setState({userArray: [...localArr]}); 
  }  

  // меняем массив с яблоками ИИ
  changeMachineScoreArray = (n, arr) => {
    let localArr = [...arr]; 
    for (let i = 0; i < n; i++) {
      localArr.push('🍎'); 
    }
    this.setState({machineArray: [...localArr]});
  }  

  // меняем общий массив яблок
  removeFromApplesArray = (n) => {
    let arr = [...this.state.apples]; 
    arr.splice(0,n); 
    this.setState({apples: [...arr]}); 
  }

  render() {
    return (
        <div className="App">
          <h1>Get even number of apples!</h1>
          <p>{this.state.apples.join(", ")}</p>
          <p>Number of apples: {this.state.apples.length}</p>
          <div className='buttons-block'>
            <Button color='red' value={1} handleClick={() => this.handleClick(1)}/>
            <Button color='green' value={2} handleClick={() => this.handleClick(2)} disabled={this.state.disabled}/>
            <Button color='blue' value={3} handleClick={() => this.handleClick(3)} disabled={this.state.disabled}/>
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
