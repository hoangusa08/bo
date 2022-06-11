// import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React from "react";

export default function useFetchBank() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  const getBank = async () => {
    try {
      setIsLoading(true);
      await http.get(`/bank`).then((response) => {
        setData(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getBank();
  }, []);
  return [data, isLoading];
}
