import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
    <div className={className}>
        <label>{field.label}</label>
        <input className="form-control"
          type="text"
          {...field.input} //onChange={field.input.onChange};onFocus={field.input.onFocus};onBlur={field.input.onBlur}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }
  //instead of this Repeated function use the above DRY code
  // renderTitleField(field) {
  //   return (
  //     <div className="form-group">
  //       <label>Title</label>
  //       <input className="form-control"
  //         type="text"
  //         {...field.input} //onChange={field.input.onChange};onFocus={field.input.onFocus};onBlur={field.input.onBlur}
  //       />
  //     </div>
  //   )
  // }
  onSubmit(values) {
    //this === component
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title for Post"
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
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  //Validate the inputs from 'values'
  if (!values.title || values.title.length < 3) {
    errors.title = "Enter a title or title needs to be at least 3 characters!";
  }
  if(!values.categories) {
    errors.categories = 'Enter some categories';
  }
  if (!values.content){
    errors.content = 'Enter some content please';
  }

  //if errors is empty, the form is fine to submit
  //If errors has *any* properties, redux form assumes form is invalid

  return errors;

}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost }) (PostsNew)
);
