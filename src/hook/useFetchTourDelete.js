import { pushToast } from "components/Toast";
import { getUser } from "core/localStore";
import http from "core/services/httpService";
import React from "react";

export default function useFetchTourDelete() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const provider = getUser();

  const getTour = async (page, keyword) => {
    try {
      setIsLoading(true);
      await http
        .get(
          `/provider/toursDelete/${provider.id}?page=${page}&keyword=${keyword}`
        )
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
