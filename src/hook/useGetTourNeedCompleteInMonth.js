// import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React from "react";

export default function useGetTourNeedCompleteInMonth() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  const getTourNeedCompleteInMonth = async (id) => {
    try {
      setIsLoading(true);
      await http.get(`/provider/tour-need-complete/${id}`).then((response) => {
        setData(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  };
  return [data, getTourNeedCompleteInMonth, isLoading];
}
