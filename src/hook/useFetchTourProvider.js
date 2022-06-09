import { pushToast } from "components/Toast";
import { getUser } from "core/localStore";
import http from "core/services/httpService";
import React from "react";

export default function useFetchTourProvider() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const provider = getUser();

  const getTours = async (status, page, keyword) => {
    try {
      setIsLoading(true);
      await http
        .get(
          `/provider/tours/${provider?.id}/${status}?page=${page}&keyword=${keyword}`
        )
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        });
    } catch (error) {
      pushToast("error", error.message);
      setIsLoading(false);
    }
  };

  return [data, getTours, isLoading];
}
