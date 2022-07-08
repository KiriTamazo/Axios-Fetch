import { useEffect, useState } from "react";

const useAxios = (configObj) => {
  const { axiosInstance, method, url, requestConfig = {} } = configObj;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
      });
      setData(response.data);
    } catch (error) {
      setError(error.message);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [method, url]);

  return { data, isLoading, error };
};

export default useAxios;
