/* eslint-disable no-undef */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';

import Question from './Question';
import Modal from '../../utility/Modal';

const sortHelpfulness = (questionsArr) => questionsArr.sort((a, b) => {
  if (a.helpfulness > b.helpfulness) {
    return -1;
  }
  return 1;
});
// should change questions modal show/hide to live here in state not in QA
const Questions = ({ questions, questionModal }) => {
  if (questionModal) {
    return (
      <Modal />
    );
  }
  // looking to see if product has changed or if startup and nothing in questions
  // eslint-disable-next-line no-undef
  if (questions.length > 0) {
    return sortHelpfulness(questions).map((question) => {
      const qid = question.question_id ? question.question_id : null;
      return (
      // eslint-disable-next-line react/jsx-props-no-spreading
        <Question key={qid} {...question} {...questionModal} />
      );
    });
  }

  return (
    <div>No Questions Asked Yet</div>
  );
};


export default Questions;
