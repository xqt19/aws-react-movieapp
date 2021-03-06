import React, {Component} from 'react'
import ReactStars from "react-rating-stars-component";
import MovieDataService from '../../api/MovieDataService.js'
import EditComponent from './EditComponent'
import {Animated} from "react-animated-css"
import ReactTable from "react-table-6"
import './MovieApp.css'
import StarRatings from 'react-star-ratings'

class ViewComponent extends Component{
    constructor(props){
        super(props)
        this.state ={
            editId: 0,
            editmode: false,
            movies: []
        }
    }
    hello=(id, movies)=>{
        // begin editing movie
        this.setState({
            editId: id,
            movies: movies,
            editmode: true
        })
    }
    hello2=()=>{
        // this is the go-back method to cancel editing
        this.setState({
            editmode: false
        })
    }

    render(){
        return(
            <div>
                {this.state.editmode === false && <ViewComponent2 method={this.hello} />}
                {this.state.editmode && <EditComponent method={this.hello2} editId={this.state.editId} movies={this.state.movies}/>}
            </div>
        )
    }
}


class ViewComponent2 extends Component{
    constructor(props){
        super(props)
        this.state ={
            movies: [],
            moviesFiltered: [],
            searchfield: "title",
            searchterm: ""
        }
    }

    componentDidMount(){
        this.refreshMovies()
    }

    refreshMovies(){
        MovieDataService.retrieveAllMovies()
        .then(response =>
            // this.handleResponse(response)
            this.handleSearches(response)
        )
    }
    // handleResponse=(response)=>{
        // this.setState({
        //     movies: response.data
        // })
    //     this.handleSearches(response)
    // }

    handleSearchbar=(e)=>{
        this.setState({
            searchterm: e.target.value
        })
        this.refreshMovies()
    }
    handleSearchfield=(e)=>{
        if(e.target.value === "movieTitle"){
            this.setState({
                searchfield: "title",
                searchterm: ""
            })
            this.refreshMovies()
        } else if (e.target.value === "movieLang"){
            this.setState({
                searchfield: "lang",
                searchterm: ""
            })
            this.refreshMovies()
        } else if (e.target.value === "movieGenre"){
            this.setState({
                searchfield: "genre",
                searchterm: ""
            })
            this.refreshMovies()
        } else if (e.target.value === "movieYear"){
            this.setState({
                searchfield: "year",
                searchterm: ""
            })
            this.refreshMovies()
        } else if (e.target.value === "movieRating"){
            this.setState({
                searchfield: "rating",
                searchterm: ""
            })
            this.refreshMovies()
        } else if (e.target.value === "movieActors"){
            this.setState({
                searchfield: "actor",
                searchterm: ""
            })
            this.refreshMovies()
        }
    }
    handleSearches =(response)=>{
        let searchterm = this.state.searchterm
        let movies = response.data
        let moviesFiltered = []
        let searchfield = this.state.searchfield
        if (searchfield === "title"){
            moviesFiltered = movies.filter(function(movie){
                if(movie.movieTitle.toUpperCase().includes(searchterm.toUpperCase())){
                    return  movie
                }
                return null
            })
        } else if (searchfield === "lang"){
            moviesFiltered = movies.filter(function(movie){
                if(movie.movieLang.toUpperCase().includes(searchterm.toUpperCase())){
                    return  movie
                }
                return null
            })
        } else if (searchfield === "genre"){
            moviesFiltered = movies.filter(function(movie){
                if(movie.movieGenre.toUpperCase().includes(searchterm.toUpperCase())){
                    return  movie
                }
                return null
            })
        } else if (searchfield === "year"){
            moviesFiltered = movies.filter(function(movie){
                if(movie.movieYear.toString().includes(searchterm)){
                    return  movie
                }
                return null
            })
        } else if (searchfield === "rating"){
            moviesFiltered = movies.filter(function(movie){
                if(movie.movieRating.toString()[0].includes(searchterm)){
                    return  movie
                }
                return null
            })
        } else if (searchfield === "actor"){
            if (searchterm===""){
                moviesFiltered = response.data
            }else{
                moviesFiltered = movies.filter(function(movie){
                    let flag = 0
                    movie.movieActors.forEach((actor) => {
                        if (  actor.toUpperCase().includes(searchterm.toUpperCase() )    ){
                            flag = 1
                        }
                    })
                    if (flag === 1){
                        return movie
                    }
                    return null
                })
            }
        }



        this.setState({
            movies: movies,
            moviesFiltered: moviesFiltered
        })
    }
    formatStar = (rating) => {

        return (<StarRatings
            rating={rating}
            starDimension="28px"
            starSpacing="2px"
            starRatedColor="gold"
        />);
    }
    

    render(){
        const columns =[
            { Header: 'Title   ↕', accessor: 'movieTitle', style:{textAlign: 'center', fontWeight: "bold", margin: "20px"} },
            { Header: 'Language   ↕', accessor:'movieLang', style:{textAlign: 'center', margin: "20px"} },
            { Header: 'Genre   ↕', accessor:'movieGenre', style:{textAlign: 'center', margin: "20px"} },
            { Header: 'Year   ↕', accessor:'movieYear', style:{textAlign: 'center', margin: "20px"} },
        { Header: 'Rating   ↕', accessor:'movieRating', style:{textAlign: 'center', margin: "20px"}, Cell: props => <React.Fragment>{this.formatStar(props.value)}</React.Fragment> },
            { Header: 'Actors   ↕', accessor:'movieActors', style:{textAlign: 'center', margin: "20px"}, Cell: props=> <ul className="list-unstyled">{props.value.map(name => <li key={name}>{name}</li>)}</ul> },
            { Header: '', accessor:'id', style:{textAlign: 'center', margin: "20px"}, Cell: props => <button className="btn btn-success" onClick={() => this.updateMovieClicked(props.value)}>Update</button>},
            { Header: '', accessor:'id', style:{textAlign: 'center', margin: "20px"}, Cell: props => <button className="btn btn-danger" onClick={() => this.deleteMovieClicked(props.value)}>Delete</button>},
        ]           
        return(
            <div>
                You can view and search for your movies here. <p />

                    <select onChange={(e) =>{this.handleSearchfield(e)}}>
                        <option value="movieTitle">Title</option>
                        <option value="movieLang">Language</option>
                        <option value="movieGenre">Genre</option>
                        <option value="movieYear">Year</option>
                        <option value="movieRating">Rating</option>
                        <option value="movieActors">Actors</option>
                    </select><p />
                    {this.state.searchfield==="title" && <input type="text" placeholder="Casablanca" className="mx-2" onChange={(e) => this.handleSearchbar(e)}></input>}
                    {this.state.searchfield==="lang" && <input type="text" placeholder="English" className="mx-2" onChange={(e) => this.handleSearchbar(e)}></input>}
                    {this.state.searchfield==="genre" && <select className="mx-2" onChange={(e) => this.handleSearchbar(e)}>
                            <option value=""></option>
                            <option value="Action">Action</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Romance">Romance</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Thriller">Thriller</option>
                        </select>}
                    {this.state.searchfield==="year" && <input type="number" placeholder="1970" className="mx-2" onChange={(e) => this.handleSearchbar(e)}></input>}
                    {this.state.searchfield==="rating" && <select className="mx-2" onChange={(e) => this.handleSearchbar(e)}>
                            <option value=""></option>
                            <option value="0"> {"<"}⭐</option>
                            <option value="1">⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="4">⭐⭐⭐⭐</option>
                            <option value="5">⭐⭐⭐⭐⭐</option>
                        </select>}
                    {this.state.searchfield==="actor" && <input type="text" placeholder="Evan Rachel Wood" className="mx-2" onChange={(e) => this.handleSearchbar(e)}></input>}   
                <p />

                {/* <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Language</th>
                            <th>Genre</th>
                            <th>Year</th>
                            <th>Rating</th>
                            <th>Actors</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.moviesFiltered.map(movie => 
                            <tr key={movie.movieTitle}>
                                <td>{movie.movieTitle}</td>
                                <td>{movie.movieLang}</td>
                                <td>{movie.movieGenre}</td>
                                <td>{movie.movieYear}</td>
                                <td><div className="d-flex justify-content-center"><ReactStars edit={false} value={movie.movieRating} isHalf={true} size={28} /></div></td>
                                <td><ul className="list-unstyled">{movie.movieActors.map(name => <li key={name}>{name}</li>)}</ul></td>
                                <td><button className="btn btn-success" onClick={() => this.updateMovieClicked(movie.id)}>Update</button></td>
                                <td><button className="btn btn-danger" onClick={() => this.deleteMovieClicked(movie.id)}>Delete</button></td>
                            </tr>   
                        )}
                    </tbody>
                </table>
                </Animated> */}




                

                {/* REACT TABLE BEGINS//////////////////////////////////// */}
                <hr />
                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                <ReactTable className="table"
                    data={this.state.moviesFiltered}
                    columns={columns}
                />
                </Animated>

            </div>
        )
    }
    updateMovieClicked=(id)=>{
        this.props.method(id, this.state.movies)
    }
    deleteMovieClicked(id){
        MovieDataService.deleteMovie(id)
        .then(response => {
            this.refreshMovies()
        })
    }

}




export default ViewComponent