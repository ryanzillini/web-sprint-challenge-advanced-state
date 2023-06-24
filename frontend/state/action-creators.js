// ❗ You don't need to add extra action creators to achieve MVP
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_SELECTED_ANSWER,
  SET_QUIZ_INTO_STATE,
  RESET_FORM,
  INPUT_CHANGE,
  SET_INFO_MESSAGE,
} from "./action-types";

import axios from "axios";

export function moveClockwise() {
  return { type: MOVE_CLOCKWISE };
}

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE };
}

export function selectAnswer(answer) {
  return { type: SET_SELECTED_ANSWER, payload: answer };
}

export function setMessage(message) {
  return {
    type: SET_INFO_MESSAGE,
    payload: message,
  };
}

export function setQuiz(quizData) {
  return { type: SET_QUIZ_INTO_STATE, payload: quizData };
}

export function inputChange(value) {
  return { type: INPUT_CHANGE, payload: value };
}

export function resetForm() {
  return { type: RESET_FORM };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    dispatch(setQuiz(null));
    axios
      .get(`http://localhost:9000/api/quiz/next`)
      .then((res) => dispatch(setQuiz(res.data)))
      .catch((error) => console.log(error));
  };
}
export function postAnswer(obj) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    axios
      .post(`http://localhost:9000/api/quiz/answer`, obj)
      .then((res) => {
        dispatch({ type: SET_SELECTED_ANSWER, payload: res.data.message });
        dispatch({
          type: SET_INFO_MESSAGE,
          payload: res.data.message,
        });
        dispatch(fetchQuiz());
        console.log("first");
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function postQuiz(quizDetails) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post(`http://localhost:9000/api/quiz/new`, quizDetails).then((res) =>
      dispatch({
        type: SET_INFO_MESSAGE,
        payload: `Congrats: "${quizDetails.question_text}" is a great question!`,
      })
    );
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
