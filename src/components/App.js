import React from "react";
import TicketWidget from "./TicketWidget";
import { SeatContext } from "./SeatContext";

import GlobalStyles from "./GlobalStyles";
import PurchaseModal from "./PurchaseModal";

function App() {
  const {
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => receiveSeatInfoFromServer(data));
  }, []);

  return (
    <>
      <TicketWidget />
      <PurchaseModal/>
      <GlobalStyles />
    </>
  );
}

export default App;
