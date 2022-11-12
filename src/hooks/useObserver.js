import {useEffect, useRef} from "react";

export const useObserver = (elem, canLoad, isLoading, callback) => {
  console.log(elem)
  const observer = useRef();
  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    var cb = function (entries) {
      if (entries[0].isIntersecting && canLoad) {
        callback();
        console.log("visible")
      }
      console.log(canLoad)
    };
    observer.current = new IntersectionObserver(cb);
    observer.current.observe(elem.current);
  }, [isLoading, canLoad]);
  
}