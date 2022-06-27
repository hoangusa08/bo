import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React from "react";

export default function useGetChartUser() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  const getChartUser = async () => {
    try {
      setIsLoading(true);
      await http.get(`/admin/dasboard/chart-user`).then((response) => {
        setData(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      pushToast("error", error.message);
      setIsLoading(false);
    }
  };

  return [data, getChartUser, isLoading];
}
