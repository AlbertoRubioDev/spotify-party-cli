import { useEffect, useState, useCallback } from "react";

const useLoggedIn = () => {
  const [headers, setHeaders] = useState("");

  const getHashParams = useCallback(() => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }, []);

  useEffect(() => {
    const token = getHashParams().access_token;
    setHeaders({
      Authorization: `Bearer ${token}`
    });
  }, [getHashParams]);

  return [headers];
};

export default useLoggedIn;
