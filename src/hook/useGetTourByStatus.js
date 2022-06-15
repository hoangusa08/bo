import { pushToast } from "components/Toast";
import { getUser } from "core/localStore";
import http from "core/services/httpService";
import React from "react";

export default function useGetTourByStatus() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const user = getUser();

  const getBooked = async (status) => {
    try {
      setIsLoading(true);
      await http
        .get(`/provider/list-book-tour/${user?.id}/${status}`)
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        });
    } catch (error) {
      pushToast("error", error.message);
      setIsLoading(false);
    }
  };

  return [data, getBooked, isLoading];
}
