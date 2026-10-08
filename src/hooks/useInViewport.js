import {
  useEffect,
  useRef,
  useState,
} from "react";


function useInViewport({
  threshold = 0.35,
  rootMargin = "0px 0px -8% 0px",
} = {}) {
  const elementRef =
    useRef(null);


  const [
    isInView,
    setIsInView,
  ] = useState(false);


  useEffect(() => {
    const element =
      elementRef.current;


    if (!element) {
      return undefined;
    }


    /*
     * Fallback para navegadores que
     * no soporten IntersectionObserver.
     */

    if (
      typeof window === "undefined" ||
      !(
        "IntersectionObserver"
        in window
      )
    ) {
      setIsInView(true);

      return undefined;
    }


    const observer =
      new IntersectionObserver(
        ([entry]) => {
          setIsInView(
            entry.isIntersecting
          );
        },
        {
          threshold,
          rootMargin,
        }
      );


    observer.observe(
      element
    );


    return () => {
      observer.disconnect();
    };

  }, [
    threshold,
    rootMargin,
  ]);


  return {
    elementRef,
    isInView,
  };
}


export default useInViewport;