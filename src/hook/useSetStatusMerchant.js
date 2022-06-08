import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React from "react";

export default function useSetStatusMerchant() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isReload, setIsReload] = React.useState(0);
  const setStatusMerchants = async (status, id) => {
    const url = !status
      ? `api/merchant/restore/${id}`
      : `/api/merchant/delete/${id}`;
    try {
      setIsLoading(true);
      await http.put(url).then((response) => {
        pushToast("success", response.message);
        setIsLoading(false);
        setIsReload(isReload + 1);
      });
    } catch (error) {
      pushToast("error", error.message);
      setIsLoading(false);
    }
  };

  return [setStatusMerchants, isLoading, isReload];
}
