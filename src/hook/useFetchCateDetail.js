import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React from "react";

export default function useFetchCateDetail() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const getCates = async (id) => {
    try {
      setIsLoading(true);
      await http.get(`/api/category/${id}`).then((response) => {
        console.log(response);
        setData(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      pushToast("error", error.message);
      setIsLoading(false);
    }
  };

  return [data, getCates, isLoading];
}
