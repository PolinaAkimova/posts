import {useState} from "react";

export const useFetch = (callback) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const fetching = async () => {
    setLoading(true);
    callback()
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.log(e)
        setError(true);
      })
      .finally(() => setLoading(false))
  };
  
  return [fetching, error, loading];
}