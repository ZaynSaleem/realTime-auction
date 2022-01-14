import React, { useEffect, useState } from "react";

const Timer = (props) => {
  const [day, setDay] = useState("00");
  const [hour, setHour] = useState("00");
  const [min, setMin] = useState("00");
  const [sec, setSec] = useState("00");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (props?.statusHandler) {
      if (new Date(props?.startTime).getTime() < new Date().getTime()) {
        if (props?.endTime) {
          let countDownDate = new Date(props?.endTime).getTime();

          props?.statusHandler(props?.id, "Ongoing");
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
              setStatus("EXPIRED");
              props?.statusHandler(props.id, "Expired");
            }
          }, 1000);
        }
      } else {
        props?.statusHandler(props.id, "Not Started");
        setStatus("Not Started");
      }
    } else {
      if (new Date(props?.startTime).getTime() < new Date().getTime()) {
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
              setStatus("EXPIRED");
           
            }
          }, 1000);
        }
      } else {
        // props?.statusHandler(props.id, "Not Started");
        // setStatus("Not Started");
      }
    }
  }, [props.endTime]);

  return <>{status !== "" ? status : `${day}d ${hour}h ${min}m ${sec}s`}</>;
};

export default Timer;
