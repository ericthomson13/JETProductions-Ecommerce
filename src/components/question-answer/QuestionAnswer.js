/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import Questions from './Questions';
import Modal from '../utility/Modal';

class QuestionAnswer extends Component {
  constructor(props) {
    super(props);
    const { product: { id } } = props;
    this.state = {
      questions: [],
      questionModal: false,
      answerModal: false,
      searched: '',
    };
    this.getQuestions(id);
  }


  componentDidUpdate(prevProps) {
	  const { product: { id } } = this.props;
	  // eslint-disable-next-line no-useless-return
	  if (id === prevProps.product.id) return;
    // need to get new questions
    this.getQuestions(id);
  }

  getQuestions = async (id) => {
    const fetchQuestions = fetch(`http://3.134.102.30/qa/${id}`).then((res) => res.json());
    const { results } = fetchQuestions;
    this.setState({ questions: results });
  }

  // need to update Search to handle this and to pass back up upon search
  // this might also need to handle filter for what questions get sent down?
  onSearchChange = (e) => {
    this.setState({ searched: e.target.value });
  }

  render() {
	  const { questions } = this.state;
	  const { answerModal } = this.state;
	  const { questionModal } = this.state;
	  return (
  <div>
    <div className="w-full px-4">
      <h5 className="uppercase font-thin text-xl">QUESTIONS & ANSWERS</h5>
    </div>
    <div>
      <SearchBar onChangeHandler={this.onSearchChange} />
      <Questions questions={questions} answerModal={answerModal} questionModal={questionModal} />
    </div>
  </div>
	  );
  }
}

const mapStateToProps = (state) => ({
  product: state.product,
});


export default connect(mapStateToProps)(QuestionAnswer);
