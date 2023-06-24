import React from "react";
import { connect } from "react-redux";
import { setMessage } from "../state/action-creators";

function Message(props) {
  const { infoMessage } = props;
  console.log(infoMessage);
  return <div id="message">{infoMessage}</div>;
}

const mapStateToProps = (state) => {
  return {
    infoMessage: state.infoMessage,
  };
};

export default connect(mapStateToProps, { setMessage })(Message);
