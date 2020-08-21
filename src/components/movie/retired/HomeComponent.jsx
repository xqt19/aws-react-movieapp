import React, {Component} from 'react'
import moment from 'moment'
import {Formik, Form, Field, ErrorMessage} from 'formik';

class HomeComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            movieName: "Blade Runner",
            desc: 'A very thrilling movie'
        }
    }
    render(){
        let desc = this.state.desc
        let movieName = this.state.movieName
        return(
            <div>
                <h2>Welcome to MovieApp</h2>
                <br />
                <h4>Find all your movie ratings here</h4>
                <br />
                <div className="container">
                <Formik 
                initialValues={{movieName, desc}}
                onSubmit={this.onSubmit}
                // validate={this.validate}
                // validateOnChange={false}
                // validateOnBlur={false}
                // enableReinitialize={true}
                >
                    {
                        (props) => (
                            <Form>
                                {/* <ErrorMessage name="desc" component="div" className="alert alert-warning" />
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning" /> */}
                                <fieldset className="form-group">
                                    <label>Movie Name</label>
                                    <Field className="form-control" type="text" name="movieName" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="desc" />
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
    onSubmit = (values) =>{
        console.log(values)
    }
    
}

export default HomeComponent