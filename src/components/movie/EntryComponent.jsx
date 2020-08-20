import React, {Component} from 'react'
import ReactStars from "react-rating-stars-component";
import {Formik, Form, Field} from 'formik';

class EntryComponent extends Component{

    constructor(props){
        super(props)
        this.state={
            movieRating: 0
        }
    }

    onSubmit=(values)=>{
        values.movieRating = this.state.movieRating
        console.log(values)
        this.props.funct(values)
    }
    ratingChanged = (newRating) => {
        this.setState({
            movieRating: newRating
        })
    };
    render(){
        let i = 1910
        let years= []
        for (i; i<2021; i++){years.push(i)}
        return(
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
                    movieActors: ["Ridley Scott"],
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
                                    <Field className="form-control" type="text" name="movieActors" />
                                </fieldset>
                                <button type="submit" className="btn btn-success">Save</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
            </div>
        )
    }
}

export default EntryComponent