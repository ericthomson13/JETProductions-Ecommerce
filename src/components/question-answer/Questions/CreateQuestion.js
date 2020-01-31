/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';

class CreateQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      name: '',
      email: '',
    };
    const { toggleModal } = props;
  }

  formChangeHandler = (location, value) => {
    const payload = {};
    payload[location] = value;
    this.setState(payload);
  }

  submitQuestion = async () => {
    // check to see if meets answer requirements
    const { body } = this.state;
    const { name } = this.state;
    const { email } = this.state;
    const { product: { id } } = this.props;

    if (body.length < 25 || body.indexOf('?') === -1) {
      console.log('question: ', body);
      // how to change styling and add a required text above the input field when requirement not met?
      return 'Invalid Question';
    }
    // need to put disclaimer in form
    // would eventually check against user credentials and name
    if (name.length < 8 || name.length > 60) {
      console.log('name');
      return 'Invalid Nickname';
    }
    if (email.length > 60 || email.indexOf('@') === -1) {
      console.log('email');
      return 'Invalid Email';
    }
    // const body = { body: question, email, name: nickname };
    // get fetch call to go and then change form display to show submitted after
    const created = await fetch(`http://52.26.193.201:3000/qa/${id}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' } },
      { body, name, email });
      // .then((res) => res.json());
    console.log('created: ', created.status);
    return created.status === 201;
  }

  render() {
    return (
      <div>
        {/* need to have this render with current product name */}
        <h3>Ask a Question</h3>
        <br />
        <label htmlFor="asked-question">
          {/* need to make this input field bigger, 1000 chars-ish */}
Question:
          <input
            id="asked-question"
            type="text"
            onChange={(e) => this.formChangeHandler('body', e.target.value)}
            placeholder="Your Question Here"
          />

        </label>
        <label htmlFor="question-nickname">
Nickname:
          <input
            id="question-nickname"
            type="text"
            onChange={(e) => this.formChangeHandler('name', e.target.value)}
            placeholder="Example: jackson11!"
            maxLength="60"
          />
        </label>
        <label htmlFor="question-email">
Email:
          <input
            id="question-email"
            type="email"
            name="question-email"
            onChange={(e) => this.formChangeHandler('email', e.target.value)}
            placeholder="Why did you like the product or not?"
            maxLength="60"
          />
        </label>
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); this.submitQuestion(); }}
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Question
        </button>
      </div>
    );
  }

  // after submit could put timeer on submitted then close modal
}

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps)(CreateQuestion);