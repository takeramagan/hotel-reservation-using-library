import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogActions } from "@mui/material";

import { initialFormValues } from "../../constants/constants";
import reservationStore from "../../store/reservationStore";

const dataConvert = (res) => {
  const {
    arrivalDate,
    departureDate,
    roomSize,
    roomQuantity,
    streetName,
    streetNumber,
    zipCode,
    state,
    city,
    ...rest
  } = res;
  return {
    ...rest,
    stay: { arrivalDate, departureDate },
    room: { roomSize, roomQuantity },
    addressStreet: { streetName, streetNumber },
    addressLocation: { zipCode, state, city },
  };
};

export const ReservationForm = ({ onClose, reservation }) => {
  const [showDel, setShowDel] = useState(false); //show Alert dialog when delete clicked

  const onDeleteClick = useCallback(() => {
    setShowDel(true);
  }, [setShowDel]);

  const onDelDialogClose = useCallback(() => {
    setShowDel(false);
  }, [setShowDel]);

  //Delete reservation
  const onConfirmDelete = useCallback(() => {
    reservationStore.delete(reservation);
    setShowDel(false);
    onClose();
  }, [setShowDel, reservation, onClose]);

  const onSubmit = useCallback(
    (values, isEditing) => {
      isEditing ? reservationStore.edit(values) : reservationStore.add(values);
      console.log(`edit=${isEditing}`, values);
      onClose();
    },
    [onClose]
  );

  const ref = useRef();
  useEffect(() => {
    const isEditing = !!reservation?.key;
    let formInitValues = initialFormValues;
    if (isEditing) {
      try {
        const {
          stay: { arrivalDate, departureDate },
          room: { roomSize, roomQuantity },
          addressStreet: { streetName, streetNumber },
          addressLocation: { zipCode, state, city },
          ...rest
        } = reservation;
        formInitValues = {
          arrivalDate,
          departureDate,
          roomSize,
          roomQuantity,
          streetName,
          streetNumber,
          zipCode,
          state,
          city,
          ...rest,
        };
      } catch {}
    }
    if (ref.current) {
      ref.current.initValues = formInitValues;
      // ref.current.formValue = formInitValues;
      ref.current.onSubmit = (v) =>
        onSubmit({ ...reservation, ...dataConvert(v) }, isEditing);
      ref.current.onDelete = onDeleteClick;
      console.log("detail", formInitValues);
    }
  }, [reservation, onDeleteClick, onSubmit]);

  return (
    <>
      <reservation-form ref={ref}></reservation-form>{" "}
      <Dialog
        open={showDel}
        // TransitionComponent={Transition}
        keepMounted
        onClose={onDelDialogClose}
      >
        <DialogTitle>{"Confirm delete?"}</DialogTitle>
        <DialogActions>
          <Button onClick={onDelDialogClose}>Cancel</Button>
          <Button onClick={onConfirmDelete} variant="contained" color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
