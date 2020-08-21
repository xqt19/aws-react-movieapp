import React, {Component} from 'react'
import MovieDataService from '../../api/MovieDataService'

class AboutComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            axiosClicked: false,
            movies: []
        }
    }
    render(){
        return(
            <div>
                This is the about component.
                <hr />

                <button className="btn btn-primary" onClick={this.loadMovies}>Click for axios</button>
                <p />
                <div>
                { this.state.axiosClicked &&
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
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
                                <td>{movie.id}</td>
                                <td>{movie.movieTitle}</td>
                                <td>{movie.movieLang}</td>
                                <td>{movie.movieGenre}</td>
                                <td>{movie.movieYear}</td>
                                <td>{movie.movieRating}</td>
                                <td><ul className="list-unstyled">{movie.movieActors.map(name => <li key={name}>{name}</li>)}</ul></td>
                                {/* <td><button className="btn btn-success" onClick={() => this.updateMovieClicked(movie.id)}>Update</button></td>
                                <td><button className="btn btn-danger" onClick={() => this.deleteMovieClicked(movie.id)}>Delete</button></td> */}
                            </tr>   
                        )}
                    </tbody>
                </table>}
                </div>
            </div>
        )
    }
    loadMovies=()=>{
        MovieDataService.retrieveAllMovies()
        .then(response =>
            this.handleResponse(response)
        )
    }
    handleResponse=(response)=>{
        this.setState({
            movies: response.data,
            axiosClicked: true
        })
    }
}

export default AboutComponent