import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React from "react";

export default function useFetchMerchants() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  const changeCate = (cate) => {
    let temp = "";
    for (let i = 0; i < cate.length; i++) {
      if (i === cate.length - 1) {
        temp = temp + cate[i].name;
        break;
      }
      temp = temp + cate[i].name + ", ";
    }
    return temp;
  };
  const getMerchants = async () => {
    try {
      setIsLoading(true);
      await http.get(`/api/merchant/`).then((response) => {
        console.log(response);
        setData(
          response.data.map((da) => ({
            ...da,
            categories: changeCate(da.categories)
          }))
        );
        setIsLoading(false);
      });
    } catch (error) {
      pushToast("error", error.message);
      setIsLoading(false);
    }
  };

  //   useLayoutEffect(() => {
  //     getMerchants();
  //   }, []);
  return [data, getMerchants, isLoading];
}
