import React, { useEffect, useState } from "react";

import "./style.css";

const Timer = (props) => {
  const [day, setDay] = useState("00");
  const [hour, setHour] = useState("00");
  const [min, setMin] = useState("00");
  const [sec, setSec] = useState("00");

  useEffect(() => {
    if (props?.endTime) {
      let countDownDate = new Date(props?.endTime).getTime();

      let x = setInterval(function () {
        let now = new Date().getTime();

        let distance = countDownDate - now;

        setDay(Math.floor(distance / (1000 * 60 * 60 * 24)));
        setHour(
          Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        );
        setMin(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        setSec(Math.floor((distance % (1000 * 60)) / 1000));

        if (distance < 0) {
          clearInterval(x);
        }
      }, 1000);
    }
  }, [props.endTime]);

  return <>{`${day}d ${hour}h ${min}m ${sec}s`}</>;
};

export default Timer;
