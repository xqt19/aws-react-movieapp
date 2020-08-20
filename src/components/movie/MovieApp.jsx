import React, {Component} from 'react'
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// import HomeComponent from './HomeComponent'
import './MovieApp.css'
import EntryComponent from './EntryComponent'
import ViewComponent from './ViewComponent'
import AboutComponent from './AboutComponent'

class MovieApp extends Component{
    constructor(props){
        super(props)
        this.state ={
            active: "Entry",
            movies:
            [
                {"id": 95, "movieTitle": "Black Panther","movieLang": "English","movieGenre": "Action","movieYear": 2018,"movieRating": 5,
                "movieActors": ["Chadwick Boseman"]},
                {"id": 96, "movieTitle": "The Irishman","movieLang": "Irish","movieGenre": "Thriller","movieYear": 2019,"movieRating": 4,
                "movieActors": ["Robert Downey Jr", "Charlie Chaplin", "Patrick Steward"]},
                {"id": 97, "movieTitle": "Casablanca","movieLang": "Spanish","movieGenre": "Romance","movieYear": 1942,"movieRating": 3,
                "movieActors": ["White House", "Kamala Harris"]},
            ]
        }
        this.activeChange = this.activeChange.bind(this)
        this.addMovie = this.addMovie.bind(this)
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

                {this.state.saveClicked && <div className="alert alert-success">New Movie Added</div>}
                {this.state.active === "Entry" && <EntryComponent funct={this.addMovie}/>}
                {this.state.active === "View" && <ViewComponent gift={this.state.movies}/>}
                {this.state.active === "About" && <AboutComponent />}
            </div>
        )
    }
    activeChange(word){
        this.setState({
            active: `${word}`,
        })
    }

    addMovie(values){
        let movies = this.state.movies
        movies.push(values)
        this.setState({
            active: "Entry",
            movies: movies
        })
        
    }
}


export default MovieApp