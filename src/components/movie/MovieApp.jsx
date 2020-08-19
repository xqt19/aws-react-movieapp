import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HomeComponent from './HomeComponent'
import './MovieApp.css'
import EntryComponent from './EntryComponent'
import ViewComponent from './ViewComponent'
import AboutComponent from './AboutComponent'

class MovieApp extends Component{
    constructor(props){
        super(props)
        this.state ={
            active: "Entry"
        }
    }
    render(){
        return(
            <div className = "MovieApp">
                <h2>Welcome to MovieApp</h2>
                <br />
                <h4>Find all your movie ratings here</h4>
                <br />
                <nav className="nav">
                    <a className="nav-link active" onClick={() => this.activeChange("Entry")}>Entry</a>
                    <a className="nav-link" onClick={() => this.activeChange("View")}>View</a>
                    <a className="nav-link" onClick={() => this.activeChange("About")}>About</a>
                </nav>

                {this.state.active === "Entry" && <EntryComponent />}
                {this.state.active === "View" && <ViewComponent />}
                {this.state.active === "About" && <AboutComponent />}
            </div>
        )
    }
    activeChange(word){
        this.setState({
            active: `${word}`
        })
    }
}


export default MovieApp