import React, {Component} from 'react'; 
import Snake from './Snake.js';
import Food from './Food.js';
import './App.css';

const grc = () => {

  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;

  return [x, y]
}

const initialState = {

  food: grc(),
  speed: 100,
  direction: 'right',
  snakeDots:[
    [0, 0],
    [2,0]
  ]

}

class App extends Component{

  state = initialState; 

  componentDidMount(){
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate(){
    this.outside();
    this.collapsed();
    this.eat();
  }


  onKeyDown = (e) =>{

    e = e || window.event;

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


  moveSnake = () =>{

    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];


    switch(this.state.direction){

      case 'right':
        head = [head[0] + 2, head[1]];
        break;

      case 'up':
        head = [head[0], head[1] - 2];
        break; 

      case 'left':
        head = [head[0] - 2, head[1]];
        break;

      case 'down':
        head = [head[0], head[1] + 2];
        break;

    }

    dots.push(head);
    dots.shift();

    this.setState({snakeDots: dots});

  }

  outside(){

    let head = this.state.snakeDots[this.state.snakeDots.length - 1];

    if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0)
      this.gameover();
    
  }

  collapsed(){

    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();

    snake.forEach(dot =>{
      if(head[0] == dot[0] && head[1] == dot[1])
        this.gameover();
    })


  }

  eat(){

    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;

    if(head[0] == food[0] && head[1] == food[1]){
      this.setState({
        food: grc()
      })
      this.largerSnake();
      this.incSpeed();
    }

  }

  largerSnake(){

    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({snakeDots: newSnake});

  }

  incSpeed(){

    if(this.state.speed > 10)
      this.setState({speed: this.state.speed - 10});

  }


  gameover(){

    let l = this.state.snakeDots.length;

    alert(`Game over! :( \n Your score: ${l}`);
    this.setState(initialState);

  }


  render(){

    return( 

      <div className = "area">
        <Snake snakeDots = {this.state.snakeDots}/>
        <Food dot = {this.state.food}/>
      </div>

    )

  }

}

export default App;