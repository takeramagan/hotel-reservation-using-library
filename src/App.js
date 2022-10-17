import React, { useLayoutEffect, useState } from "react";
import "./App.css";
import Home from "./Home";
// import data from "./reservations.json";
import { ReservationContext, FilterContext } from "./context/Context";
import { filterInitData } from "./constants/constants";
import reservationStore from "./store/reservationStore";

function App() {
  const [reservations, setReservations] = useState([]);
  const [filters, setFilters] = useState(filterInitData);

  useLayoutEffect(() => {
    const sub = reservationStore.subscribe(setReservations);
    reservationStore.init();
    return () => sub.unsubscribe();
  }, []);

  return (
    <ReservationContext.Provider value={[reservations, setReservations]}>
      <FilterContext.Provider value={[filters, setFilters]}>
        <Home />
      </FilterContext.Provider>
    </ReservationContext.Provider>
  );
}

export default App;
