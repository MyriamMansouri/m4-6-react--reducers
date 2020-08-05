import React from "react";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import Tooltip from "./Tooltip";
import seatAvailable from "../assets/seat-available.svg";
import { BookingContext } from "./BookingContext";

const Seat = ({ status, rowName, seatIndex, price, seatId }) => {
  const {
    actions: { beginBookingProcess },
  } = React.useContext(BookingContext);

  return (
    <Tippy
      delay={70}
      content={
        <Tooltip rowName={rowName} seat={seatIndex + 1} price={price} />
      }
    >
      <button
        disabled={status === "available" ? false : true}
        onClick={() => beginBookingProcess(seatId, price)}
      >
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
