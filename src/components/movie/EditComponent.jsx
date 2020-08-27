import React, {Component} from 'react'
import ReactStars from "react-rating-stars-component";
import {Formik, Form, Field} from 'formik';
import MovieDataService from '../../api/MovieDataService.js'

class EditComponent extends Component{
    constructor(props){
        super(props)
        this.state ={
            saveClicked: false,
            movieRating: 0,
            movie: null,
            noOfActors: null
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
            movie: response.data
        })
    }
    onSubmit=(values)=>{
       
        values.movieRating = this.state.movieRating
        values.id = this.props.editId
        // let actors = []
        // let i=1
        // for(i; i<this.state.noOfActors+1; i++){
        //     actors.push(values[i])
        // }
        // values.movieActors = actors
        // this.setState({
        //     saveClicked: true
        // })
        MovieDataService.updateMovie(values)
        .then(response =>
            this.props.method()
        )
    }
    ratingChanged = (newRating) => {
        this.setState({
            movieRating: newRating
        })
    };
    addActor =() => {
        let actors = this.state.movie.movieActors
        let length = actors.length +1
        actors.push(`New Actor ${length}`)
        this.setState({
            noOfActors: actors.length
        })
    }
    hello=()=>{
        this.props.method()
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
                                {/* <fieldset className="form-group">
                                    <label>Actors</label>
                                    {this.state.movie.movieActors.map(actor => <Field className="form-control" type="text" name={actor} key={actor} placeholder={actor} />)}
                                    <button type="button" className="btn btn-primary m-3" onClick={this.addActor}>Add another actor</button>
                                </fieldset> */}
                                <hr />
                                {this.state.saveClicked && <div className="alert alert-success">Movie Updated!</div>}
                                <button type="submit" className="btn btn-success">Save</button>
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