import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React from "react";

export default function useGetChartSalePro() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  const getChartSale = async (id, year) => {
    try {
      setIsLoading(true);
      await http
        .get(`/provider/dashboard/chart/${id}/${year}`)
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        });
    } catch (error) {
      pushToast("error", error.message);
      setIsLoading(false);
    }
  };

  return [data, getChartSale, isLoading];
}
