import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React from "react";

export default function useGetTotal() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  const getTotal = async () => {
    try {
      setIsLoading(true);
      await http.get(`/admin/dasboard/total`).then((response) => {
        setData(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      pushToast("error", error.message);
      setIsLoading(false);
    }
  };

  return [data, getTotal, isLoading];
}
