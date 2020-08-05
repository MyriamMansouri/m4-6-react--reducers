import React from "react";

const Tooltip = ({rowName, seat, price}) => {
  return <p>Row {rowName}, Seat {seat} - ${price}</p>;
};

export default Tooltip;
