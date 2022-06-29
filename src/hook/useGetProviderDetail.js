import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React from "react";

export default function useGetProviderDetail() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  const getProviderDetail = async (id) => {
    try {
      setIsLoading(true);
      await http.get(`/provider/detail/${id}`).then((response) => {
        setData(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      pushToast("error", error.message);
      setIsLoading(false);
    }
  };

  return [data, getProviderDetail, isLoading];
}
