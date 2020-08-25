import React, {Component} from 'react'

class ViewComponent extends Component{
    constructor(props){
        super(props)
        this.state ={
            movies:
            [

            ]
        }
    }

    componentDidMount(){
        let tuna = this.props.gift
        this.setState({
            movies: tuna
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
                        {this.props.gift.map(movie => 
                            <tr key={movie.movieTitle}>
                                {/* <td>{movie.id}</td> */}
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