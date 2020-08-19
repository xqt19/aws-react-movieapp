import React, {Component} from 'react'
import {Formik, Form, Field} from 'formik';

class EntryComponent extends Component{

    onSubmit=(values)=>{
        
        console.log(values)
    }
    render(){
        return(
            <div>
            <div className="container">
                <Formik 
                initialValues={{
                    movieTitle: "Blade Runner",
                    movieLang: "English",
                    movieGenre: "Action",
                    movieYear: "1982",
                    movieRating: "5",
                    movieActors: "Ridley Scott",
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
                                    <Field className="form-control" type="text" name="movieGenre" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field className="form-control" type="text" name="movieYear" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Rating</label>
                                    <Field className="form-control" type="text" name="movieRating" />
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