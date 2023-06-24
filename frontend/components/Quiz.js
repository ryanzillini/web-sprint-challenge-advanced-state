import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  setQuiz,
  selectAnswer,
  fetchQuiz,
  postAnswer,
  postQuiz,
} from "../state/action-creators";

function Quiz(props) {
  useEffect(() => {
    if (!props.quiz) {
      props.fetchQuiz();
    }
  }, []);

  const handleAnswerClick = (id) => {
    props.selectAnswer(props.quiz.answers[id].answer_id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      quiz_id: props.quiz.quiz_id,
      answer_id: props.selectedAnswer,
    };
    props.postAnswer(payload);
  };
  console.log(props);
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              <div
                className={`answer ${
                  props.selectedAnswer === props.quiz.answers[0].answer_id
                    ? "selected"
                    : ""
                }`}
              >
                {props.quiz.answers[0].text}
                <button onClick={() => handleAnswerClick(0)}>
                  {props.selectedAnswer === props.quiz.answers[0].answer_id
                    ? "SELECTED"
                    : "Select"}
                </button>
              </div>
              <div
                className={`answer ${
                  props.selectedAnswer === props.quiz.answers[1].answer_id
                    ? "selected"
                    : ""
                }`}
              >
                {props.quiz.answers[1].text}
                <button onClick={() => handleAnswerClick(1)}>
                  {props.selectedAnswer === props.quiz.answers[1].answer_id
                    ? "SELECTED"
                    : "Select"}
                </button>
              </div>
            </div>

            <button
              id="submitAnswerBtn"
              onClick={handleSubmit}
              disabled={props.selectedAnswer ? false : true}
            >
              Submit answer
            </button>
          </>
        ) : (
          "Loading next quiz..."
        )
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer,
  };
};

export default connect(mapStateToProps, {
  setQuiz,
  selectAnswer,
  fetchQuiz,
  postAnswer,
  postQuiz,
})(Quiz);
