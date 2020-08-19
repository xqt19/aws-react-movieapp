import React, {Component} from 'react'

class ViewComponent extends Component{
    constructor(props){
        super(props)
        this.state ={
            movies:
            [
                {"id": 95, "movieTitle": "Black Panther","movieLang": "English","movieGenre": "Action","movieYear": "2018","movieRating": "5",
                "movieActors": "Chadwick Boseman"},
                {"id": 96, "movieTitle": "The Irishman","movieLang": "Irish","movieGenre": "Thriller","movieYear": "2019","movieRating": "4",
                "movieActors": "Patrick Steward"},
                {"id": 97, "movieTitle": "Casablanca","movieLang": "Spanish","movieGenre": "Romance","movieYear": "1942","movieRating": "3",
                "movieActors": "White House"},
            ]
        }
    }

    // componentDidMount(){
    //     this.refreshMovies();
    // }
    render(){
        return(
            <div>
                You can view your movies here. <p />

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
                            <tr key={movie.id}>
                                <td>{movie.id}</td>
                                <td>{movie.movieTitle}</td>
                                <td>{movie.movieLang}</td>
                                <td>{movie.movieGenre}</td>
                                <td>{movie.movieYear}</td>
                                <td>{movie.movieRating}</td>
                                <td>{movie.movieActors}</td>
                                {/* <td><button className="btn btn-success" onClick={() => this.updateMovieClicked(movie.id)}>Update</button></td>
                                <td><button className="btn btn-danger" onClick={() => this.deleteMovieClicked(movie.id)}>Delete</button></td> */}
                            </tr>   
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
    updateMovieClicked(id){
        console.log(`updateMovieClicked - Id: ` + id)
    }
    deleteMovieClicked(id){
        console.log(`deleteMovieClicked - Id: ` + id)
    }

}

export default ViewComponent