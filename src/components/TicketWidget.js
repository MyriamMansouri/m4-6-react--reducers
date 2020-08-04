import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import Seat from "./Seat";
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import { SeatContext } from "./SeatContext";

const TicketWidget = () => {
  const { state } = React.useContext(SeatContext);
  const { numOfRows, seatsPerRow } = state;

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  return (
    <Main>
      {!state.hasLoaded && <CircularProgress />}

      {state.hasLoaded && (
        <Wrapper>
          {range(numOfRows).map((rowIndex) => {
            const rowName = getRowName(rowIndex);

            return (
              <Row key={rowIndex}>
                <RowLabel>Row {rowName}</RowLabel>
                {range(seatsPerRow).map((seatIndex) => {
                  const seatId = `${rowName}-${getSeatNum(seatIndex)}`;

                  return (
                    <SeatWrapper key={seatId}>
                      <Seat />
                    </SeatWrapper>
                  );
                })}
              </Row>
            );
          })}
        </Wrapper>
      )}
    </Main>
  );
};

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height:100vh;
`;

const Wrapper = styled.div`
  margin: 20px;
  display: inline-block;
  text-align: center;
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
  position:absolute;
  transform: translateX(calc(-100% - 30px));
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
