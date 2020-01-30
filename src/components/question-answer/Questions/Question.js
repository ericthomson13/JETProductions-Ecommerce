/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import Answers from '../Answers/Answers';

// should be able to refactor both of these to be just one function in long run,
// also maybe refactor to be own module work with both question and answer
const helpfulUpdate = async (e, id) => {
  e.preventDefault();
  const status = await fetch(`http://3.134.102.30/qa/question/${id}/helpful`, { method: 'PUT', headers: { 'Content-Type': 'application/json' } }).then((result) => result.status);
  return status === 204;
};
const reportUpdate = async (e, id) => {
  e.preventDefault();
  const status = await fetch(`http://3.134.102.30/qa/question/${id}/report`, { method: 'PUT', headers: { 'Content-Type': 'application/json' } }).then((result) => result.status);
  console.log('report: ', status);
  return status === 204;
};

const Question = ({
  question_id, question_body, asker_name, question_helpfulness,
}) => {
  const [helpfulButton, buttonUsed] = useState(false);
  const [helpfulnessState, helpfulnessUpdate] = useState(question_helpfulness);
  const [reportState, reportStateUpdate] = useState(false);

  const helpfulnessHander = async (e) => {
    const updated = await helpfulUpdate(e, question_id);
    if (updated) {
      helpfulnessUpdate(helpfulnessState + 1);
      buttonUsed(true);
    }
  };
  const reportHandler = async (event) => {
    console.log('reportHandler');
    const reported = await reportUpdate(event, question_id);
    if (reported) {
      reportStateUpdate(true);
    }
  };
  return (
    <div>
      <h4>
Q:
        {' '}
        {question_body}
      </h4>
      <span>
Helpfulness?
        <button type="button" disabled={helpfulButton} onClick={(e) => { helpfulnessHander(e); }}>Yes</button>
      (
        {helpfulnessState}
)
        {' '}
        {' '}
        <button
          type="button"
          disbled={reportState}
          onClick={(e) => { reportHandler(e); }}
        >
          Report
        </button>
      </span>
      <Answers question_id={question_id || null} />

    </div>
  );
};


export default Question;
