import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import React from "react";

export default function useFetchCate() {
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
  const getCates = async () => {
    try {
      setIsLoading(true);
      await http.get(`/api/category`).then((response) => {
        console.log(response);
        setData(
          response.data.map((da) => ({
            ...da,
            subcategories: changeCate(da.subcategories)
          }))
        );
        setIsLoading(false);
      });
    } catch (error) {
      pushToast("error", error.message);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getCates();
  }, []);
  return [data, isLoading];
}
