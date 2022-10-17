import React, { useEffect, useRef } from "react";

export const SearchCriteria = ({ setFilter }) => {
  const ref = useRef();

  useEffect(() => {
    ref.current && (ref.current.onSubmit = setFilter);
  }, [setFilter]);

  return <search-filter ref={ref} />;
};
