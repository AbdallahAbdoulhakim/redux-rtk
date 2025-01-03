import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const useApi = (endpoint, method = "GET", body = null) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const response = await axiosInstance({
          url: endpoint,
          method,
          data: body,
        });

        setResponse(response.data.data);
        setError(null);
      } catch (error) {
        setError(error?.message);
        setResponse(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [body, endpoint, method]);

  return { response, error, isLoading };
};

export default useApi;
