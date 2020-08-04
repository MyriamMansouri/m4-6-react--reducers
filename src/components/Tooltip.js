import React from "react";

const Tooltip = ({rowName, seatIndex, price}) => {
  return <p>Row {rowName}, Seat {seatIndex} - ${price}</p>;
};

export default Tooltip;
