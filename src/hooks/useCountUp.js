import {
  useEffect,
  useRef,
  useState,
} from "react";


function easeOutCubic(t) {
  return (
    1 -
    Math.pow(
      1 - t,
      3
    )
  );
}


function useCountUp({
  end,
  duration = 1000,
  delay = 0,
  decimals = 2,
}) {

  const [value, setValue] =
    useState(0);


  const currentValueRef =
    useRef(0);


  useEffect(() => {

    let animationFrame = null;
    let timeout = null;


    const startValue =
      currentValueRef.current;


    const difference =
      end - startValue;


    if (
      Math.abs(difference) <
      0.001
    ) {

      currentValueRef.current =
        end;

      setValue(end);

      return undefined;

    }


    timeout =
      setTimeout(() => {

        const startTime =
          performance.now();


        const animate =
          (currentTime) => {

            const elapsed =
              currentTime -
              startTime;


            const progress =
              Math.min(
                elapsed /
                  duration,
                1
              );


            const eased =
              easeOutCubic(
                progress
              );


            const nextValue =
              startValue +
              difference *
                eased;


            currentValueRef.current =
              nextValue;


            setValue(
              Number(
                nextValue.toFixed(
                  decimals
                )
              )
            );


            if (
              progress < 1
            ) {

              animationFrame =
                requestAnimationFrame(
                  animate
                );

            } else {

              currentValueRef.current =
                end;

              setValue(end);

            }

          };


        animationFrame =
          requestAnimationFrame(
            animate
          );

      }, delay);


    return () => {

      clearTimeout(
        timeout
      );


      if (
        animationFrame !== null
      ) {

        cancelAnimationFrame(
          animationFrame
        );

      }

    };

  }, [
    end,
    duration,
    delay,
    decimals,
  ]);


  return value;
}


export default useCountUp;