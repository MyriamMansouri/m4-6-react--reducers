import React from "react";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import Tooltip from "./Tooltip";
import seatAvailable from "../assets/seat-available.svg";

const Seat = ({ isBooked, rowName, seatIndex, price }) => {
  return (
    <Tippy
      delay={100}
      content={
        <Tooltip rowName={rowName} seatIndex={seatIndex} price={price} />
      }
    >
      <img
        src={seatAvailable}
        alt="seat-available"
        style={{ filter: `grayscale(${isBooked ? 100 : 0}%)` }}
      />
    </Tippy>
  );
};

export default Seat;
