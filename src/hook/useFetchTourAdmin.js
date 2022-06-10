import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React from "react";

export default function useFetchTourAdmin() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  const getTour = async (status, page, keyword) => {
    try {
      setIsLoading(true);
      await http
        .get(`/admin/tours${status}?page=${page}&keyword=${keyword}`)
        .then((response) => {
          console.log(response);
          setData(response.data);
          setIsLoading(false);
        });
    } catch (error) {
      pushToast("error", error.message);
      setIsLoading(false);
    }
  };

  return [data, getTour, isLoading];
}
