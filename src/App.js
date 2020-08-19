import React, {Component} from 'react';
import MovieApp from './components/movie/MovieApp'
import './App.css';

class App extends Component{
  render(){
    return(
      <div className="App">
        <MovieApp />
      </div>
    )
  }
}

export default App;
