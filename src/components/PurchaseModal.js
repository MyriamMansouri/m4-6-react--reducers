import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { BookingContext } from "./BookingContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "20ch",
    },
  },
}));

const PurchaseModal = () => {
  const classes = useStyles();

  const [creditCard, setCreditCard] = React.useState("");
  const [expiration, setExpiration] = React.useState("");

  const {
    state,
    actions: {
      resetBookingProcess,
      submitCreditCardInfo,
      completedPurchase,
      purchaseTicketFailure,
    },
  } = React.useContext(BookingContext);

  const { selectedSeatId, price } = state;

  const getSeatDetails = (seatId) => {
    if (seatId) {
      return seatId.split("-");
    } else {
      return Array(2);
    }
  };

  const handleClose = () => {
    resetBookingProcess();

  };

  const handlePurchase = (seatId, creditCard, expiration) => {

    submitCreditCardInfo();
    fetch("/api/book-seat", {
      method: "POST",
      body: JSON.stringify({ seatId, creditCard, expiration }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          completedPurchase();
          handleClose();
        } else {
            purchaseTicketFailure(data.message);
        }
      });
  };
  return (
    <Dialog
      open={selectedSeatId !== null}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Purchase ticket</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You're purchasing <span style={{ fontWeight: "bold" }}>1</span> ticket
          for the price of ${price}.
        </DialogContentText>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Row</TableCell>
              <TableCell align="center">Seat</TableCell>
              <TableCell align="center">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">
                {getSeatDetails(selectedSeatId)[0]}
              </TableCell>
              <TableCell align="center">
                {getSeatDetails(selectedSeatId)[1]}
              </TableCell>
              <TableCell align="center">${price}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            label="Credit card"
            variant="outlined"
            value={creditCard}
            onChange={(e) => setCreditCard(e.target.value)}
          />
          <TextField
            label="Expiration"
            variant="outlined"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
          />
        </form>
        <Button
          onClick={() => handlePurchase(selectedSeatId, creditCard, expiration)}
          size="large"
          color="primary"
          variant="contained"
        >
          PURCHASE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PurchaseModal;
