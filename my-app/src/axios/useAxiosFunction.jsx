import { useEffect, useState } from "react";

const useAxiosFunction = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (configObj) => {
    const { axiosInstance, method, url, requestConfig = {} } = configObj;
    try {
      setIsLoading(true);
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
  }, []);

  return { data, isLoading, error, fetchData };
};

export default useAxiosFunction;
