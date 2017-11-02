import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from '../actions'
class PostsNew extends Component {
    
    renderField(field) {
        const { meta: { touched, error} } = field
        const className = `form-group ${ touched && error ? 'has-danger' : ''}`

        //we receive field so we can link this function with the Field component
        return(
            <div className={className}>
                <label>{field.label}</label>
                <input 
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/')
        })
    }

    render() {
        const { handleSubmit } = this.props; // this is comming from the wiring up between reduxForm we are doing at the end of the file
        //handle submit takes in a function - that we have defined - and if everything is fine with validations and stuff, then our function is run, we bind it because we want - to be this component
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field 
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field 
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}

function validate(values){
    const errors = {}

    //validate the inputs from 'values
    if(!values.title) {
        errors.title = "Enter a title!"
    }
    if(!values.categories) {
        errors.categories = "Enter a categories!"
    }
    if(!values.content) {
        errors.content = "Enter some content!"
    }
    //if errors is empty, the form is fine to submit
    return errors;
}

//the string here must be unique throughout the app, so when we want to show more than one form at a time we can define different names to them
export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
) // this syntax is explained on Section 9 lecture 142