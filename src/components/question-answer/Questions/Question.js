/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import React, { useState } from 'react';

import Answers from '../Answers/Answers';
import AnswerModal from '../Answers/AnswerModal';
import Updater from '../HelpfulReportHandler';

const Question = ({
  question_id, question_body, question_helpfulness,
}) => {
  const [helpfulButton, buttonUsed] = useState(false);
  const [helpfulnessState, helpfulnessUpdate] = useState(question_helpfulness);
  const [reportState, reportStateUpdate] = useState(false);
  const [createAnswer, createAnswerView] = useState(false);

  const helpfulnessHander = async (e) => {
    const updated = await Updater(e, question_id, 'question', 'helpful');
    if (updated) {
      helpfulnessUpdate(helpfulnessState + 1);
      buttonUsed(true);
    }
  };
  const reportHandler = async (event) => {
    const reported = await Updater(event, question_id, 'question', 'report');
    if (reported) {
      reportStateUpdate(true);
    }
  };
  if (createAnswer) {
    return (
      <AnswerModal show={createAnswer} toggleModal={createAnswerView} question_id={question_id} />
    );
  }
  return (
    <div>
      <h4>
Q:
        {' '}
        {question_body}
      </h4>
      <span>
Helpful?
        <button type="button" disabled={helpfulButton} onClick={(e) => { helpfulnessHander(e); }}>Yes</button>
      (
        {helpfulnessState}
)
        {' '}
        {' '}
        <button
          type="button"
          disabled={reportState}
          onClick={(e) => { reportHandler(e); }}
        >
          Report
        </button>
        {'  '}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); createAnswerView(true); }}
          className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded"
        >
          Add Answer
        </button>
      </span>
      {/* working to get to only take up certain amount of space with scrolling */}
      <Answers className="h-screen w-overflow-y-scroll" question_id={question_id || null} />
    </div>
  );
};


export default Question;
