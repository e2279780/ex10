import React from "react";

function YouHaveWonDialog({ isActive, clickCount, onStartOver, onClose }) {
  return (
    <div className={`modal ${isActive ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box has-text-centered">
          <h2 className="title">You have Won!</h2>
          <p>It took you {clickCount} clicks to solve the puzzle.</p>
          <button className="button is-primary mt-4" onClick={onStartOver}>
            Start Over
          </button>
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={onClose}
      ></button>
    </div>
  );
}

export default YouHaveWonDialog;