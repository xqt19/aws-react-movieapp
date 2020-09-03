import React, {Component} from 'react'
import './MovieApp.css'
import EntryComponent from './EntryComponent'
import ViewComponent from './ViewComponent'
import AboutComponent from './AboutComponent'

class MovieApp extends Component{
    constructor(props){
        super(props)
        this.state ={
            active: "Entry",
        }
        this.activeChange = this.activeChange.bind(this)
    }
    render(){
        return(
            <div className = "MovieApp">
                <h2>Welcome to MovieApp</h2>
                <br />
                <h4>Find all your movie ratings here</h4>
                <br />
                <nav className="nav">
                    <button className={this.state.active === "Entry" ? "nav-link active" : "nav-link"} onClick={() => this.activeChange("Entry")}>Entry</button>
                    <button className={this.state.active === "View" ? "nav-link active" : "nav-link"}  onClick={() => this.activeChange("View")}>View</button>
                    <button className={this.state.active === "About" ? "nav-link active" : "nav-link"}  onClick={() => this.activeChange("About")}>About</button>
                </nav>

                

                {this.state.active === "Entry" && <EntryComponent method={this.activeChange}/>}
                {this.state.active === "View" && <ViewComponent/>}
                {this.state.active === "About" && <AboutComponent />}


            </div>
        )
    }
    activeChange(word){
        this.setState({
            active: `${word}`,
        })
    }
}


export default MovieApp