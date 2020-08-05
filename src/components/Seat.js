import React from "react";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import Tooltip from "./Tooltip";
import seatAvailable from "../assets/seat-available.svg";

const Seat = ({ status, rowName, seatIndex, price }) => {
  return (
    <Tippy
      delay={70}
      content={
        <Tooltip rowName={rowName} seatIndex={seatIndex} price={price} />
      }
    >
      <button disabled={status === "available" ? false : true}>
        <img
          src={seatAvailable}
          alt="seat-available"
          style={{ filter: `grayscale(${status === "available" ? 0 : 100}%)` }}
        />
      </button>
    </Tippy>
  );
};

export default Seat;
