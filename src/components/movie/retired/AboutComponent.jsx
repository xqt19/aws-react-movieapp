import React, {Component} from 'react'
import ReactStars from "react-rating-stars-component"
import {Formik, Form, Field} from 'formik'
import MovieDataService from '../../api/MovieDataService'

class AboutComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            axiosClicked: false,
            movies: [],
            formClicked: false,
            saveClicked: false,
            movieRating: 0,
            noOfActors: 1
        }
    }
    onSubmit=(values)=>{
        let actors = []
        let i=1
        for(i; i<this.state.noOfActors+1; i++){
            actors.push(values[i])
        }
        values.movieRating = this.state.movieRating
        values.movieActors = actors
        this.setState({
            saveClicked: true
        })
        let movie = {
            "movieTitle": values.movieTitle,
            "movieLang": values.movieLang,
            "movieGenre": values.movieGenre,
            "movieYear": 1992,
            "movieRating": this.state.movieRating,
            "movieActors": actors
            }
            console.log(movie)
        MovieDataService.createNewMovie(movie)
        .then((response) => {console.log(response)})
        .catch((error) => {console.log(error.response.data.message)})
    }
    ratingChanged = (newRating) => {
        this.setState({
            movieRating: newRating
        })
    };
    addActor =() => {
        this.setState({
            noOfActors: this.state.noOfActors +1
        })
    }
    render(){
        let i = 1910
        let years= []
        for (i; i<2021; i++){years.push(i)}
        let j=1
        let num = this.state.noOfActors+1
        let numarray = []
        for (j; j<num; j++){numarray.push(j)}
        return(
            <div>
                This is the about component.
                <hr />
                <button className="btn btn-secondary" onClick={this.loadForm}>Click for form</button>
                <button className="btn btn-primary" onClick={this.loadMovies}>Click for axios</button>
                <p />
                { this.state.formClicked &&

                    <div>
                            <div className="container">
                                You can add a new movie here
                                <p />
                                <Formik 
                                initialValues={{
                                    movieTitle: "Blade Runner",
                                    movieLang: "English",
                                    movieGenre: "Action",
                                    movieYear: 1982,
                                    movieRating: 5,
                                    1: "Ridley Scott"
                                }}
                                onSubmit={this.onSubmit}
                                enableReinitialize={true}
                                >
                                    {
                                        (props) => (
                                            <Form>
                                                <fieldset className="form-group">
                                                    <label>Title</label>
                                                    <Field className="form-control" type="text" name="movieTitle" />
                                                </fieldset>
                                                <fieldset className="form-group">
                                                    <label>Language</label>
                                                    <Field className="form-control" type="text" name="movieLang" />
                                                </fieldset>
                                                <fieldset className="form-group">
                                                    <label>Genre</label>
                                                    <Field className="form-control" as="select" name="movieGenre">
                                                        <option value="Action">Action</option>
                                                        <option value="Comedy">Comedy</option>
                                                        <option value="Romance">Romance</option>
                                                        <option value="Sci-Fi">Sci-Fi</option>
                                                        <option value="Thriller">Thriller</option>
                                                    </Field>
                                                </fieldset>
                                                <fieldset className="form-group">
                                                    <label>Year of Release</label>
                                                    <Field className="form-control"as="select" name="movieYear">
                                                        {years.map(year => <option value={year} key={year}>{year}</option>)}
                                                    </Field>
                                                </fieldset>
                                                <fieldset className="form-group">
                                                    <label>Rating</label>
                                                    <div className="d-flex justify-content-center">
                                                        <ReactStars
                                                            count={5}
                                                            onChange={this.ratingChanged}
                                                            size={42}
                                                            isHalf={true}
                                                            emptyIcon={<i className="far fa-star"></i>}
                                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                            fullIcon={<i className="fa fa-star"></i>}
                                                            activeColor="#ffd700"
                                                        />
                                                    </div>
                                                </fieldset>
                                                <fieldset className="form-group">
                                                    <label>Actors</label>
                                                    {numarray.map(num => <Field className="form-control" type="text" name={num} key={num} />)}
                                                    <button type="button" className="btn btn-primary m-3" onClick={this.addActor}>Add another actor</button>
                                                </fieldset>
                                                <hr />
                                                {this.state.saveClicked && <div className="alert alert-success">New Movie Added</div>}
                                                <button type="submit" className="btn btn-success">Save</button>
                                            </Form>
                                        )
                                    }
                                </Formik>
                            </div>

                    </div>
                }



                { this.state.axiosClicked &&
                <div>
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
                </table>
                </div>}
            </div>
        )
    }
    loadForm=()=>{
        this.setState({
            axiosClicked: false,
            formClicked: true
        })
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
            axiosClicked: true,
            formClicked: false
        })
    }
}

export default AboutComponent