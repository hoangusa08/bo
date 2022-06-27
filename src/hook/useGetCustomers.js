import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React from "react";

export default function useGetCustomers() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  const getCustomers = async (page, search) => {
    try {
      setIsLoading(true);
      await http
        .get(`admin/customers?page=${page}&keyword=${search}`)
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        });
    } catch (error) {
      pushToast("error", error.message);
      setIsLoading(false);
    }
  };

  return [data, getCustomers, isLoading];
}
