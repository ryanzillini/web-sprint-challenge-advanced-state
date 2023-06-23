import React, { useState } from "react";
import { connect } from "react-redux";
import { moveClockwise, moveCounterClockwise } from "../state/action-creators";

function Wheel(props) {
  // const [index, setIndex] = useState(initialWheelState)
  console.log(props);
  return (
    <div id="wrapper">
      <div id="wheel">
        {[0, 1, 2, 3, 4, 5].map((idx) => (
          <div
            key={idx}
            className={`cog${idx === props.wheelState ? " active" : ""}`}
            style={{ "--i": `${idx}` }}
          >
            {idx === props.wheelState ? "B" : null}
          </div>
        ))}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={props.moveCounterClockwise}>
          Counter Clockwise
        </button>
        <button id="clockwiseBtn" onClick={props.moveClockwise}>
          Clockwise
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    wheelState: state.wheel,
  };
};

const mapDispatchToProps = {
  moveClockwise,
  moveCounterClockwise,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wheel);
