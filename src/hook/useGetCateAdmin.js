import http from "core/services/httpService";
import React from "react";

export default function useGetCateAdmin() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  const getCategories = async (page, search) => {
    try {
      setIsLoading(true);
      await http
        .get(`/category/admin?page=${page}&keyword=${search}`)
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };
  return [data, getCategories, isLoading];
}
