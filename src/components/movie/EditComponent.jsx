import React, {Component} from 'react'
import ReactStars from "react-rating-stars-component";
import {Formik, Form, Field} from 'formik';
import MovieDataService from '../../api/MovieDataService.js'

class EditComponent extends Component{
    constructor(props){
        super(props)
        this.state ={
            saveClicked: false,
            movieTitleInUse: false,
            movieRating: 0,
            movie: null,
            movieActors: [],
            editActors: false
        }
    }
    componentDidMount(){
        this.loadForm()
    }

    loadForm(){
        MovieDataService.getMovie(this.props.editId)
        .then(response =>
            this.handleResponse(response)
        )
    }
    handleResponse=(response)=>{
        this.setState({
            movie: response.data,
            movieRating: response.data.movieRating,
            movieActors: response.data.movieActors
        })
    }
    onSubmit=(values)=>{
        values.movieRating = this.state.movieRating
        values.id = this.props.editId
        let actorsFiltered = this.state.movieActors.filter(function(names){
            if (names !== ""){
                return names
            }
            return null
        })
        values.movieActors = actorsFiltered
        // validating the movie title is unique
        let flag = 0
        this.props.movies.forEach((movie)=>{
            if (values.movieTitle === movie.movieTitle){
                flag = 1
            }
        })
        if (flag === 1){
            this.setState({
                movieTitleInUse: true
            })
        } else{
            this.setState({
                saveClicked: true,
                movieTitleInUse: false
            })
            MovieDataService.updateMovie(values)
            .then(response =>
                this.props.method()
            )            
        }
    }
    ratingChanged = (newRating) => {
        this.setState({
            movieRating: newRating
        })
    };
    addActor =() => {
        let actors = this.state.movieActors
        actors.push("")
        this.setState({
            movieActors: actors
        })
    }
    hello=()=>{
        this.props.method()
    }
    EditActorButton=()=>{
        this.setState({
            editActors: true
        })
    }
    handleActorChange=(e, index)=>{
        let actors = this.state.movieActors
        actors[index] = e.target.value
        this.setState({
            movieActors: actors
        })
    }

    render(){
        let i = 1910
        let years= []
        for (i; i<2021; i++){years.push(i)}

        return(
            <div>
            {this.state.movie !==null && <div className="container">
                Updating your movie... or press to go back <br /><button className="btn btn-link" onClick={this.hello}>Go Back</button> 
                <hr />
                <Formik 
                initialValues={{
                    movieTitle: this.state.movie.movieTitle,
                    movieLang: this.state.movie.movieLang,
                    movieGenre: this.state.movie.movieGenre,
                    movieYear: this.state.movie.movieYear,
                    movieRating: this.state.movie.movieRating // Make the stars show up
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
                                            value={this.state.movieRating}
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
                                    {this.state.movieActors.map((actor, index) => <Field className="form-control" type="text" name={index} key={index} value={actor} onChange={(e)=>{this.handleActorChange(e, index)}} />)}
                                    <button type="button" className="btn btn-primary m-3" onClick={this.addActor}>Add an actor</button>
                                </fieldset>

                                <hr />
                                {this.state.saveClicked && <div className="alert alert-success">Movie Updated!</div>}
                                {this.state.movieTitleInUse && <div className="alert alert-danger">There Is Already Another Movie By This Name</div>}
                                <button type="submit" className="btn btn-success">Update</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>}
            </div>
        )
    }
}

export default EditComponent;