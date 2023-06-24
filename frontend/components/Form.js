import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";

export function Form(props) {
  const onChange = (evt) => {
    evt.preventDefault();
    props.inputChange(evt.target);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    props.postQuiz({
      question_text: props.form.newQuestion,
      true_answer_text: props.form.newTrueAnswer,
      false_answer_text: props.form.newFalseAnswer,
    });
    props.resetForm();
  };

  const disableBtn = () => {
    if (
      props.form.newQuestion.trim().length > 0 &&
      props.form.newTrueAnswer.trim().length > 0 &&
      props.form.newFalseAnswer.trim().length > 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
        value={props.form.newQuestion}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
        value={props.form.newTrueAnswer}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
        value={props.form.newFalseAnswer}
      />
      <button id="submitNewQuizBtn" disabled={disableBtn()}>
        Submit new quiz
      </button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    form: state.form,
  };
};

const mapDispatchToProps = {
  inputChange: actionCreators.inputChange,
  postQuiz: actionCreators.postQuiz,
  resetForm: actionCreators.resetForm,
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
