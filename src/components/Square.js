import React from "react";

const Square = (props) => {
  const { symbol, chooseSquare } = props;

  return (
    <div className="square" onClick={chooseSquare}>
      {symbol}
    </div>
  );
};

export default Square;
