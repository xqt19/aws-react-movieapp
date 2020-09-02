import React, {Component} from 'react'
import ReactStars from "react-rating-stars-component";
import MovieDataService from '../../api/MovieDataService.js'
import EditComponent from './EditComponent'

class ViewComponent extends Component{
    constructor(props){
        super(props)
        this.state ={
            editId: 0,
            editmode: false
        }
    }
    hello=(id)=>{
        // begin editing movie
        this.setState({
            editId: id,
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
                {this.state.editmode && <EditComponent method={this.hello2} editId={this.state.editId}/>}
            </div>
        )
    }
}


class ViewComponent2 extends Component{
    constructor(props){
        super(props)
        this.state ={
            movies: []
        }
    }

    componentDidMount(){
        this.refreshMovies()
    }

    refreshMovies(){
        MovieDataService.retrieveAllMovies()
        .then(response =>
            this.handleResponse(response)
        )
    }
    handleResponse=(response)=>{
        this.setState({
            movies: response.data
        })
    }

    render(){           
        return(
            <div>
                You can view your movies here. <p />

                <table className="table">
                    <thead>
                        <tr>
                            {/* <th>ID</th> */}
                            <th>Title</th>
                            <th>Language</th>
                            <th>Genre</th>
                            <th>Year</th>
                            <th>Rating</th>
                            <th>Actors</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map(movie => 
                            <tr key={movie.movieTitle}>
                                {/* <td>{movie.id}</td> */}
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
            </div>
        )
    }
    updateMovieClicked=(id)=>{
        this.props.method(id)
    }
    deleteMovieClicked(id){
        MovieDataService.deleteMovie(id)
        .then(response => {
            this.refreshMovies()
        })
    }

}




export default ViewComponent