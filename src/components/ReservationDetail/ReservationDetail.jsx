import React from "react";
import { Box, Modal, Paper } from "@mui/material";
import { ReservationForm } from "./ReservationForm";

export const ReservationDetail = ({ onClose, reservation }) => {
  return (
    <Modal open={!!reservation} onClose={onClose} sx={{ overflow: "scroll" }}>
      <Box
        sx={{
          width: 800,
          margin: "auto",
        }}
      >
        <Paper sx={{ p: 2, mt: 4 }}>
          <ReservationForm onClose={onClose} reservation={reservation} />
        </Paper>
      </Box>
    </Modal>
  );
};
