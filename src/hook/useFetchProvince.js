import http from "core/services/httpService";
import React from "react";

export default function useFetchProvince() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  const getProvince = async () => {
    try {
      setIsLoading(true);
      await http.get(`/province`).then((response) => {
        setData(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getProvince();
  }, []);
  return [data, isLoading];
}
