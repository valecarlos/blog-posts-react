import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

class PostsNew extends Component {
    renderField(field) {
        //we receive field so we can link this function with the Field component
        return(
            <div className="form-group">
                <label>{field.label}</label>
                <input 
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                {field.meta.error}
            </div>
        )
    }

    onSubmit(values) {
        console.log(values)
    }

    render() {
        const { handleSubmit } = this.props;

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
})(PostsNew)