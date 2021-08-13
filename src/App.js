import React, {Component} from 'react';
import Snake from './Snake.js';
import Food from './Food.js';
import Obstacol from './Obstacol.js';
import TwoUnits from './TwoUnits.js';
import BReset from './Buttons/ButtonReset.js';
import BSS from './Buttons/StartStop.js';
import './App.css';

const grc = () => {

  let max = 98;
  let min = 1;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;

  while(x >= 98)
    x--;
  while(x <= 1)
    x++;

  while(y >= 98)
    y--;
  while(y <= 1)
    y++;
  

  return [x, y]
}

const grt = () => {

  let maxi = 10;
  let t = Math.floor(Math.random() * maxi);

  return t;
}

const initialstate = {
  
  food: grc(),
  obstacol: grc(),
  units: grc(),
  direction: 'right',
  snakeDots:[
    [0, 1,],
    [2, 1,]
  ],
  speed: 50,
  time: grt(),
  start: 0

}


class App extends Component{

  state = initialstate;


  componentDidMount(){

    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
    
  }

  componentDidUpdate(){

    this.outside();
    this.collapsed();
    this.eat();
    this.eatspecial();

  }



  onKeyDown = (e) => {

    if(this.state.start){

      e = e || window.event;

      if(this.state.direction == 'left' && (e.keyCode == 68 || e.keyCode == 39))
        this.gameover();

      else if(this.state.direction == 'right' && (e.keyCode == 65 || e.keyCode == 37))
        this.gameover();

      else if(this.state.direction == 'up' && (e.keyCode == 83 || e.keyCode == 40))
        this.gameover();

      else if(this.state.direction == 'down' && (e.keyCode == 87 || e.keyCode == 38))
        this.gameover();
      else{

        switch(e.keyCode){

          case 87:
            this.setState({direction: 'up'});
            break;

          case 38:
            this.setState({direction: 'up'});
            break;

          case 65:
            this.setState({direction: 'left'});
            break;
      
          case 37:
            this.setState({direction: 'left'});
            break;

          case 83:
            this.setState({direction: 'down'});
            break;
      
          case 40:
            this.setState({direction: 'down'});
            break;

          case 68:
            this.setState({direction: 'right'});
            break;
        
          case 39:
            this.setState({direction: 'right'});
            break;

        }

      }

    }
  }


  moveSnake = () => {

    if(this.state.start){

    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch(this.state.direction){

        case 'up':
          head = [head[0], head[1] - 2];
          break;

        case 'down':
          head = [head[0], head[1] + 2];
          break;

        case 'right':
          head = [head[0] + 2, head[1]];
          break;

        case 'left':
          head = [head[0] - 2, head[1]];
          break;

        }

        dots.push(head);
        dots.shift();

        this.setState({snakeDots: dots});
    }

  }


  outside(){

    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    
    if(head[0] < 0 || head[1] < 0 || head[0] >= 98 || head[1] >= 98)
      this.gameover();

  }

  collapsed(){

    let obstacol = this.state.obstacol;
    let t = this.state.units;
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();

    if(obstacol[0] == head[0] && obstacol[1] == head[1])
      this.gameover();
    else{

      snake.forEach(dot =>{
       
        if(head[0] == dot[0] && head[1] == dot[1])
          this.gameover();
      
      
      })
    }
    
  }


  eatspecial(){

    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    let t = this.state.units;

    if(this.state.time == 0 && ((t[0] == head[0] && t[1] == head[1]) || (Math.abs(t[0] - head[0]) <= 3 && Math.abs(t[1] - head[1]) <= 3))){

      this.largerSnake2();
      this.setState({units: grc()});
      this.setState({time: grt()});

    }

  }

  eat(){

    let food = this.state.food;
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let obstacol = this.state.obstacol;

    if((obstacol[0] == head[0] && obstacol[1] == head[1]) || (Math.abs(obstacol[0] - head[0]) <= 2 && Math.abs(obstacol[1] - head[1]) <= 2)){

      this.gameover();
      this.setState({obstacol: grc()});

    }
    else if((food[0] == head[0] && food[1] == head[1]) || (Math.abs(food[0] - head[0]) <= 3 && Math.abs(food[1] - head[1]) <= 3)){

      this.setState({
        food: grc(),
        obstacol: grc()
      })

      this.largerSnake1();
      this.decrSpeed();

      if(this.state.time != 0)
        this.setState({time: this.state.time - 1});

    }

  }

  largerSnake1(){

      let snake = [...this.state.snakeDots];
      snake.unshift([]);
      this.setState({snakeDots: snake});
    
  }

  largerSnake2(){

    let snake = [...this.state.snakeDots];
    snake.unshift([]);
    snake.unshift([]);
    this.setState({snakeDots: snake});

  }

  decrSpeed(){

    if(this.state.speed < 300)
      this.setState({speed: this.state.speed + 20});

  }

  gameover(){

    let score = this.state.snakeDots.length - 2;
    alert(`Game over! :( Your score: ${score}`);
    this.setState(initialstate);

  }

  clickTriggered = e => {

    let v = e.target.getAttribute('data-value');

    switch(v){

      case "reset":
        this.setState(initialstate);
        break;

      case "bss":
        if(this.state.start == 0)
          this.setState({start: 1});
        else this.setState({start: 0});
        break;
    }


  }

  render(){

    return(

      <div className = "game">

        <p>
        <link rel="stylesheet" href="https://use.typekit.net/oov2wcw.css"/>
          Current score: {this.state.snakeDots.length - 2}
        </p>

        <p>
        <link rel="stylesheet" href="https://use.typekit.net/oov2wcw.css"/>
          Speed: {360 - this.state.speed}
        </p>

        <BReset onClick = {this.clickTriggered} value = "reset" symbol = "Reset"/>
        <BSS onClick = {this.clickTriggered} value = "bss" symbol = "Start/Stop"/>
        <div className = "area">
        
        <Snake snakeDots = {this.state.snakeDots}/>
        <Food dot = {this.state.food}/>
        <Obstacol dot = {this.state.obstacol}/>
        <TwoUnits dot = {this.state.units} val = {this.state.time}/>

        </div>

      </div>

    )

  }

  
}

export default App;