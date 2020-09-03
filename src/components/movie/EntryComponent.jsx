import React, {Component} from 'react'
import ReactStars from "react-rating-stars-component";
import {Formik, Form, Field} from 'formik';
import MovieDataService from '../../api/MovieDataService.js'
import {Animated} from "react-animated-css";

class EntryComponent extends Component{

    constructor(props){
        super(props)
        this.state={
            saveClicked: false,
            movieTitleInUse: false,
            movieRating: 0,
            movieActors: ["Ridley Scott"],
            movies: []
        }
    }
    componentDidMount(){
        MovieDataService.retrieveAllMovies()
        .then(response =>
            this.handleRetrieval(response)
        )        
    }
    onSubmit=(values)=>{
        let movies = this.state.movies
        values.movieRating = this.state.movieRating
        let actorsFiltered = this.state.movieActors.filter(function(names){
            if (names !== ""){
                return names
            }
            return null
        })
        values.movieActors = actorsFiltered
        // validating the movie title is unique
        let flag = 0
        movies.forEach((movie)=>{
            if (values.movieTitle.toUpperCase() === movie.movieTitle.toUpperCase()){
                flag = 1
            }
        })
        if (flag === 1){
            this.setState({
                saveClicked: false,
                movieTitleInUse: true
            })
        } else{
            movies.push(values)
            MovieDataService.createNewMovie(values)
            .then(response =>
                console.log(response)
            )
            this.setState({
                saveClicked: true,
                movieTitleInUse: false
            })
            setTimeout(()=>{ this.props.method("View") }, 500)
            
        }

    }
    handleRetrieval = (response) =>(
        this.setState({
            movies: response.data
        })
    )

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
    handleActorChange = (e,index)=>{
        let actors = this.state.movieActors
        actors[index] = e.target.value
        this.setState({
            movieActors : actors
        })
    }

    render(){
        let i = 1910
        let years= []
        for (i; i<2021; i++){years.push(i)}
        return(
            <div>
            <div className="container">
                You can add a new movie here
                <p />
                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
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
                                    {this.state.movieActors.map((actor, index) => <Field className="form-control" type="text" name={index} key={index} value={actor} onChange={(e)=> this.handleActorChange(e,index)} />)}
                                    <button type="button" className="btn btn-primary m-3" onClick={this.addActor}>Add another actor</button>
                                </fieldset>
                                {/* <fieldset className="form-group">
                                    <label>Actors</label>
                                    {numarray.map(num => <Field className="form-control" type="text" name={num} key={num} />)}
                                    <button type="button" className="btn btn-primary m-3" onClick={this.addActor}>Add another actor</button>
                                </fieldset> */}
                                <hr />
                                {this.state.saveClicked && <div className="alert alert-success">New Movie Added</div>}
                                {this.state.movieTitleInUse && <div className="alert alert-danger">There Is Already Another Movie By This Name</div>}
                                <button type="submit" className="btn btn-success">Save</button>
                            </Form>
                        )
                    }
                </Formik>
                </Animated>
            </div>
            </div>
        )
    }
}

export default EntryComponent