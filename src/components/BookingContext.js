import React from "react";

export const BookingContext = React.createContext(null);

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

const reducer = (state, { type, selectedSeatId, price, error }) => {
  switch (type) {
    case "begin-booking-process":
      return { ...state, status: "seat-selected", selectedSeatId , price };
    case "submit-credit-card-info":
      return { ...state, status: "awaiting-response" };
    case "purchase-ticket-failure":
      return { ...state, status: "error", error };
    case "completed-purchase":
      return { ...state, status: "purchased" };
    case "reset-booking-process":
      return initialState;
    default:
      return state;
  }
};
export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const beginBookingProcess = ( selectedSeatId, price ) => {
    console.log(selectedSeatId)
    dispatch({
      type: "begin-booking-process",
      ...state,
      selectedSeatId,
      price
    });
  };

  const purchaseTicketFailure = (message) => {
    dispatch({
      type: "purchase-ticket-failure",
      ...state,
      error: message
    });
  };

  const submitCreditCardInfo = () => {
    dispatch({
      type: "submit-credit-card-info",
      ...state,
    });
  };


  const completedPurchase = () => {
    dispatch({
      type: "completed-purchase",
      ...state,
    });
  };


  const resetBookingProcess = () => {
    dispatch({
      type: "reset-booking-process",
      ...state,
    });
  };
  console.log(state)
  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          beginBookingProcess,
          resetBookingProcess,
          submitCreditCardInfo,
          completedPurchase,
          purchaseTicketFailure
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
