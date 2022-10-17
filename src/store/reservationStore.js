import moment from "moment";
import { Subject } from "rxjs";
import reservations from "../reservations.json";

const initData = reservations.map((v, i) => {
  const arrivalDate = moment(v?.stay?.arrivalDate).format("YYYY-MM-DD");
  const departureDate = moment(v?.stay?.departureDate).format("YYYY-MM-DD");
  return {
    ...v,
    key: i + 1,
    stay: {
      arrivalDate,
      departureDate,
    },
  };
}); // add unique key for data, start from 1

const subject = new Subject();
const initialState = {
  data: initData,
  key: initData.length, //largest unique key in data.
};

let state = initialState;

const reservationStore = {
  init: () => {
    subject.next(initialState.data);
  },
  subscribe: (setState) => subject.subscribe(setState),
  add: (v) => {
    state = {
      ...state,
      data: [...state.data, { ...v, key: state.key + 1 }],
      key: state.key + 1,
    };
    subject.next(state.data);
  },
  delete: (v) => {
    const newData = state.data.filter((_) => _.key !== v.key);
    state = { ...state, data: newData };
    subject.next(state.data);
  },
  edit: (v) => {
    const newData = state.data.map((_) => (_.key === v.key ? v : _));
    state = { ...state, data: newData };
    subject.next(state.data);
  },
};

export default reservationStore;
