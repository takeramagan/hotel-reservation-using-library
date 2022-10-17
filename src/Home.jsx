import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { FilterContext, ReservationContext } from "./context/Context";
import { ReservationDetail, SearchCriteria } from "./components";
import { tableColumn } from "./constants/constants";
import moment from "moment/moment";
import "@takeramagan/hotel-library";

const filterData = (v, filters) =>
  (v.firstName ?? "").toLowerCase().includes(filters.firstName.toLowerCase()) &&
  (v.lastName ?? "").toLowerCase().includes(filters.lastName.toLowerCase()) &&
  (v.email ?? "").toLowerCase().includes(filters.email.toLowerCase()) &&
  (v.phone ?? "").includes(filters.phone) &&
  (v.stay.arrivalDate ?? "").includes(filters?.arrivalDate ?? "") &&
  (v.stay.departureDate ?? "").includes(filters?.departureDate ?? "");

const Home = () => {
  const [reservationData] = useContext(ReservationContext); // data list
  const [filter, setFilter] = useContext(FilterContext); // data list
  const [filteredData, setFilteredData] = useState(reservationData); // searched data
  const [curReservation, setCurReservation] = useState(null); //null: close Modal, {}: empty object, Add new reservation, {email:...} : not empty object, edit reservation

  useEffect(() => {
    const newDisplyData = reservationData.filter((v) => filterData(v, filter));
    setFilteredData(newDisplyData);
  }, [reservationData, filter, setFilteredData]);

  //Add new reservation
  const onAddNew = useCallback(() => {
    setCurReservation({});
  }, [setCurReservation]);

  //Edit reservation
  const onEdit = useCallback(
    (v) => {
      const key = v?.get("key");
      const _reserves = reservationData.filter((_) => _.key === key);
      setCurReservation(_reserves.length > 0 ? _reserves[0] : {});
      // console.log(v.get("key"));
    },
    [setCurReservation, reservationData]
  );

  //close reservation detail modal
  const onCloseModal = useCallback(() => {
    setCurReservation(null);
  }, [setCurReservation]);

  const ref = useRef();

  useEffect(() => {
    const dataSource = filteredData.map((v) => {
      const {
        firstName,
        lastName,
        room: { roomSize, roomQuantity },
        stay: { arrivalDate, departureDate },
        email,
        phone,
        key,
      } = v;
      return {
        firstName,
        lastName,
        email,
        phone,
        roomSize,
        roomQuantity,
        arrivalDate: moment(arrivalDate).format("YYYY-MM-DD"),
        departureDate: moment(departureDate).format("YYYY-MM-DD"),
        key,
      };
    });
    console.log({ dataSource });
    ref.current.dataSource = dataSource;
    ref.current.columns = tableColumn;
    ref.current.onEdit = onEdit;
  }, [filteredData, onEdit]);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Hotel reservation system
        </Typography>
        <Button
          variant="contained"
          sx={{ alignSelf: "flex-end" }}
          onClick={onAddNew}
        >
          Add new
        </Button>
      </Box>
      <SearchCriteria setFilter={setFilter} />
      <reservation-table ref={ref}></reservation-table>
      {/* <ReservationTable filteredData={filteredData} onEdit={onEdit} /> */}
      {!!curReservation && (
        <ReservationDetail
          onClose={onCloseModal}
          reservation={curReservation}
        />
      )}
    </Container>
  );
};

export default Home;
